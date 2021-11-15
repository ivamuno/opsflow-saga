import { CommandWithDestinationBuilder, ISaga, CommandWithDestination, CommandMessageHeaders, SagaCommandHeaders } from "@saga-orchestration/core";
import { SagaExchangeConfiguration } from "@opsflow-orchestration/participants";
import { AcehubSetupCommand, AcehubSetup, AcehubChannel, SagaAceHubConfiguration } from "@opsflow-orchestration/participants/aceHub";
import { PayOnSetupCommand, PayOnSetup, PayOnAmexChannel, PayOnAmexMerchantAccount, PayOnBcmcChannel, PayOnBcmcMerchantAccount, SagaPayOnConfiguration } from "@opsflow-orchestration/participants/payOn";
import { AcehubDisable, AcehubDisableCommand } from "@opsflow-orchestration/participants/aceHub/acehub-disable.command";
import { PayOnDisable, PayOnDisableCommand } from "@opsflow-orchestration/participants/payOn/payon-disable.command";
import { v4 as uuidv4 } from "uuid";
import { AmqpConnection } from "@nestjs-plus/rabbitmq";
import { ExternalContextCreator } from "@nestjs/core/helpers/external-context-creator";
const waitSync = require("wait-sync");

export class SetupSaga extends ISaga<SetupSagaData> {
    public constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly externalContextCreator: ExternalContextCreator
    ) {
        super();
        this.sagaDefinition = this
            .step().invokeParticipant(data => {
                data.trace.status = SetupSagaDataTraceStatus.Init;
                data.trace.init.command = SetupSagaDataTraceState.Success;
                data.trace.payon.command = SetupSagaDataTraceState.Waiting;
                this.emitAceHubSetups(data);
                return this.beginPayOnSetup(data);
            }, this.checkPayOnSetup)
            .onReply("PayOnSetupReply", (data, rawReply) => {
                data.trace.payon.command = SetupSagaDataTraceState.Success;
                this.emitAceHubSetups(data);
            })
            .onReply("String", (data, rawReply) => {
                data.trace.status = SetupSagaDataTraceStatus.Compensating;
                data.trace.payon.command = SetupSagaDataTraceState.Error;
                this.emitAceHubSetups(data);
            })
            .withCompensation(data => {
                data.trace.payon.compensation = SetupSagaDataTraceCompensationState.Waiting;
                return this.compensateBeginPayOnSetup(data);
            })
            .onReply("PayOnDisableReply", (data, rawReply) => {
                data.trace.payon.compensation = SetupSagaDataTraceCompensationState.Success;
                this.emitAceHubSetups(data);
            })
            .onReply("String", (data, rawReply) => {
                data.trace.status = SetupSagaDataTraceStatus.Compensating;
                data.trace.payon.command = SetupSagaDataTraceState.Error;
                this.emitAceHubSetups(data);
            })
            .step().invokeParticipant(data => {
                data.trace.acehub.command = SetupSagaDataTraceState.Waiting;
                this.emitAceHubSetups(data);
                return this.beginAcehubSetup(data);
            }, this.checkPayOnSetup)
            .onReply("AcehubSetupReply", (data, rawReply) => {
                data.trace.acehub.command = SetupSagaDataTraceState.Success;
                console.log("AcehubSetupReply", data)
                this.emitAceHubSetups(data);
            })
            .onReply("String", (data, rawReply) => {
                data.trace.status = SetupSagaDataTraceStatus.Compensating;
                data.trace.payon.compensation = SetupSagaDataTraceCompensationState.Waiting;
                data.trace.acehub.command = SetupSagaDataTraceState.Error;
                this.emitAceHubSetups(data);
            })
            .withCompensation(data => {
                data.trace.acehub.compensation = SetupSagaDataTraceCompensationState.Waiting;
                return this.compensateBeginAcehubSetup(data);
            })
            .build();
    }

    private emitAceHubSetups(data: SetupSagaData) {
        waitSync(2);
        console.log("emitAceHubSetups", data.trace);
        this.amqpConnection.publish("SetupSaga-exchange-events", "", data);
    }

    private checkPayOnSetup(data: SetupSagaData): boolean {
        return data.paymentMethods.filter(pm => ["BCMC", "AMEX"].includes(pm)).length > 0;
    }

    private beginPayOnSetup(data: SetupSagaData): CommandWithDestination {
        let channels: any[] = [];
        if (data.paymentMethods.includes("BCMC")) {
            channels.push(new PayOnBcmcChannel(`${data.merchantName}BCMC`, [new PayOnBcmcMerchantAccount("ANY", "RETAIL", ["978"], "", data.businessId, "UID")]));
        }

        if (data.paymentMethods.includes("AMEX")) {
            channels.push(new PayOnAmexChannel(`${data.merchantName}AMEX`, [new PayOnAmexMerchantAccount("ANY", "RETAIL", ["978"], "", data.businessId, "", false)]));
        }

        const message: PayOnSetup = new PayOnSetup(data.merchantName, channels);
        const sagaCommandHeaders: SagaCommandHeaders = {
            sagaId: data.correlationId,
            sagaType: "SetupSaga"
        };
        const commandMessageHeaders: CommandMessageHeaders = {
            id: uuidv4(),
            commandType: (new PayOnSetupCommand(null, null, null, null)).constructor.name,
            destination: SagaPayOnConfiguration.SetupSagaPayOnRequestRoutingKey,
            replyTo: SagaExchangeConfiguration.SetupSagaResponseRoutingKey,
            timestamp: new Date(Date.now())
        };
        const commandMessage: PayOnSetupCommand = new PayOnSetupCommand(data.correlationId, commandMessageHeaders, sagaCommandHeaders, message);
        return CommandWithDestinationBuilder.send(commandMessage).to(commandMessageHeaders.destination).build();
    }

    private compensateBeginPayOnSetup(data: SetupSagaData): CommandWithDestination {
        const message: PayOnDisable = new PayOnDisable(data.businessId);
        const sagaCommandHeaders: SagaCommandHeaders = {
            sagaId: data.correlationId,
            sagaType: "SetupSaga"
        };
        const commandMessageHeaders: CommandMessageHeaders = {
            id: uuidv4(),
            commandType: (new PayOnDisableCommand(null, null, null, null)).constructor.name,
            destination: SagaPayOnConfiguration.SetupSagaPayOnRequestRoutingKey,
            replyTo: SagaExchangeConfiguration.SetupSagaResponseRoutingKey,
            timestamp: new Date(Date.now())
        };
        const commandMessage: PayOnDisableCommand = new PayOnDisableCommand(data.correlationId, commandMessageHeaders, sagaCommandHeaders, message);
        return CommandWithDestinationBuilder.send(commandMessage).to(commandMessageHeaders.destination).build();
    }

    private beginAcehubSetup(data: SetupSagaData): CommandWithDestination {
        const channels: AcehubChannel[] = data.paymentMethods.map(pm => AcehubChannel[pm]);
        const message: AcehubSetup = new AcehubSetup(data.businessId, data.merchantName, channels);
        const sagaCommandHeaders: SagaCommandHeaders = {
            sagaId: data.correlationId,
            sagaType: "SetupSaga"
        };
        const commandMessageHeaders: CommandMessageHeaders = {
            id: uuidv4(),
            commandType: (new AcehubSetupCommand(null, null, null, null)).constructor.name,
            destination: SagaAceHubConfiguration.SetupSagaAcehubRequestRoutingKey,
            replyTo: SagaExchangeConfiguration.SetupSagaResponseRoutingKey,
            timestamp: new Date(Date.now())
        };
        const commandMessage: AcehubSetupCommand = new AcehubSetupCommand(data.correlationId, commandMessageHeaders, sagaCommandHeaders, message);
        return CommandWithDestinationBuilder.send(commandMessage).to(commandMessageHeaders.destination).build();
    }

    private compensateBeginAcehubSetup(data: SetupSagaData): CommandWithDestination {
        const message: AcehubDisable = new AcehubDisable(data.businessId);
        const sagaCommandHeaders: SagaCommandHeaders = {
            sagaId: data.correlationId,
            sagaType: "SetupSaga"
        };
        const commandMessageHeaders: CommandMessageHeaders = {
            id: uuidv4(),
            commandType: (new AcehubDisable(null)).constructor.name,
            destination: SagaPayOnConfiguration.SetupSagaPayOnRequestRoutingKey,
            replyTo: SagaExchangeConfiguration.SetupSagaResponseRoutingKey,
            timestamp: new Date(Date.now())
        };
        const commandMessage: AcehubDisableCommand = new AcehubDisableCommand(data.correlationId, commandMessageHeaders, sagaCommandHeaders, message);
        return CommandWithDestinationBuilder.send(commandMessage).to(commandMessageHeaders.destination).build();
    }

    public onSagaCompletedSuccessfully(sagaId: string, data: SetupSagaData): void {
        data.trace.status = SetupSagaDataTraceStatus.End;
        data.trace.finish.command = SetupSagaDataTraceState.Success;
        this.emitAceHubSetups(data);
        console.log("onSagaCompletedSuccessfully", sagaId, data);
    }

    public onSagaRolledBack(sagaId: string, data: SetupSagaData): void {
        data.trace.status = SetupSagaDataTraceStatus.End;
        data.trace.finish.command = SetupSagaDataTraceState.Error;
        this.emitAceHubSetups(data);
        console.log("onSagaRolledBack", sagaId, data);
    }
}

export class SetupSagaData {
    public constructor(
        readonly correlationId: string,
        readonly timestamp: Date,
        readonly businessId: string,
        readonly merchantName: string,
        readonly paymentMethods: string[],
        readonly trace: SetupSagaDataTrace
    ) { }
}

export class SetupSagaDataTrace {
    status: SetupSagaDataTraceStatus;
    init: SetupSagaDataTraceStep;
    cards: SetupSagaDataTraceStep;
    payon: SetupSagaDataTraceStep;
    acehub: SetupSagaDataTraceStep;
    finish: SetupSagaDataTraceStep;
}

export class SetupSagaDataTraceStep {
    command: SetupSagaDataTraceState;
    compensation?: SetupSagaDataTraceCompensationState;
}

export enum SetupSagaDataTraceStatus {
    Init = "Init",
    Creating = "Creating",
    Compensating = "Compensating",
    End = "End"
}

export enum SetupSagaDataTraceState {
    Default = "default",
    Success = "success",
    Waiting = "primary",
    Error = "danger"
}

export enum SetupSagaDataTraceCompensationState {
    Default = "default",
    Success = "warning",
    Waiting = "info",
    Error = "danger"
}
