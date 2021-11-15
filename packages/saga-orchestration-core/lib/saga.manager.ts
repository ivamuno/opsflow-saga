import { ISaga, SagaActions, SagaDefinition } from "./saga.definition";
import { ICommandProducer, SagaCommandProducer } from "./command.producer";
import { ICommandReplyConsumer } from "./commandReply.consumer";
import { ISagaInstanceRepository } from "./sagaInstance.Repository";
import { ExternalContextCreator } from "@nestjs/core/helpers/external-context-creator";
import { CommandMessage, CommandReplyMessage } from "./commandMessage.model";

export interface ISagaManager<T> {
    create(sagaId: string, sagaData: T): Promise<SagaInstance>;

    subscribeToReplyChannel(): Promise<void>;
}

export class SagaManager<T> implements ISagaManager<T> {
    public constructor(
        readonly saga: ISaga<T>,
        readonly sagaInstanceRepository: ISagaInstanceRepository,
        readonly commandProducer: ICommandProducer,
        readonly commandReplyConsumer: ICommandReplyConsumer,
        readonly sagaCommandProducer: SagaCommandProducer,
        private readonly externalContextCreator: ExternalContextCreator
    ) { }

    public async create(sagaId: string, sagaData: T): Promise<SagaInstance> {
        const sagaInstance = new SagaInstance(this.saga.getSagaType(), sagaId, '????', null, JSON.stringify(sagaData), new Set<string>());

        await this.sagaInstanceRepository.save(sagaInstance);

        this.saga.onStarting(sagaId, sagaData);

        const sagaDefinition: SagaDefinition<T> = this.saga.getSagaDefinition();
        const actions: SagaActions<T> = sagaDefinition.start(sagaData);

        await this.processActions(sagaInstance, sagaData, actions);

        return sagaInstance;
    }

    public async subscribeToReplyChannel(): Promise<void> {
        var handler = this.externalContextCreator.create(
            this,
            this.handleReply,
            'handle'
        );
        await this.commandReplyConsumer.subscribe(this.saga.getSagaResponseChannel(), handler);
    }

    private async processActions(sagaInstance: SagaInstance, sagaData: T, actions: SagaActions<T>): Promise<void> {
        const lastRequestId: string = await this.sagaCommandProducer.sendCommands(sagaInstance.sagaType, sagaInstance.id, actions.commands);
        sagaInstance.lastRequestId = lastRequestId;

        this.updateState(sagaInstance, actions);

        sagaInstance.serializedSagaData = JSON.stringify(actions.updatedSagaData ?? sagaData);

        if (actions.endState) {
            await this.performEndStateActions(sagaInstance, actions.compensating, sagaData);
        }

        await this.sagaInstanceRepository.update(sagaInstance);
    }

    private updateState(sagaInstance: SagaInstance, actions: SagaActions<T>): void {
        const stateName: string = actions.updatedState;
        sagaInstance.stateName = stateName;
        sagaInstance.endState = actions.endState;
        sagaInstance.compensating = actions.compensating
    }

    private async performEndStateActions(sagaInstance: SagaInstance, compensating: boolean, sagaData: T): Promise<void> {
        for (const d of sagaInstance.destinations) {
            const command = new CommandMessage<any>();
            command.sagaHeaders = { sagaId: sagaInstance.id, sagaType: this.saga.getSagaType() };
            await this.commandProducer.send(d, command);
        }

        if (compensating) {
            this.saga.onSagaRolledBack(sagaInstance.id, sagaData);
        } else {
            this.saga.onSagaCompletedSuccessfully(sagaInstance.id, sagaData);
        }
    }

    private async handleReply(message: CommandReplyMessage<any>): Promise<void> {
        if (!this.isReplyForThisSagaType(message)) {
            return;
        }

        const sagaId: string = message.sagaHeaders.sagaId;
        const sagaType: string = message.sagaHeaders.sagaType;
        const sagaInstance: SagaInstance = await this.sagaInstanceRepository.find(sagaType, sagaId);
        const sagaData: any = JSON.parse(sagaInstance.serializedSagaData);

        const currentState: string = sagaInstance.stateName;

        const actions: SagaActions<T> = this.saga.getSagaDefinition().handleReply(currentState, sagaData, message);

        await this.processActions(sagaInstance, sagaData, actions);
    }

    private isReplyForThisSagaType(message: CommandReplyMessage<any>): boolean {
        return message.sagaHeaders.sagaType === this.saga.getSagaType();
    }
}

export class SagaInstance {
    public constructor(
        public readonly sagaType: string,
        public readonly id: string,
        public stateName: string,
        public lastRequestId: string,
        public serializedSagaData: string,
        public readonly destinations: Set<string> = new Set<string>(),
        public endState: boolean = false,
        public compensating: boolean = false
    ) { }
}
