import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { SagaManager, ICommandProducer, SagaCommandProducer, ICommandReplyConsumer } from '@saga-orchestration/core';
import { RabbitMqCommandProducer, RabbitCommandReplyConsumer } from '@saga-orchestration/rabbitmq';
import { SetupSagaData, SetupSaga, SetupSagaDataTraceState, SetupSagaDataTraceCompensationState, SetupSagaDataTraceStatus } from './sagas/setup-saga';
import { SagaInstanceRepository } from './sagas/sagainstance.repository';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { MessageDto } from './dto/message.dto';
import { SagaExchangeConfiguration } from "@opsflow-orchestration/participants";

@Injectable()
export class AppService {
    private sagaSetupManager: SagaManager<SetupSagaData>;
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly sagaRepository: SagaInstanceRepository,
        private readonly externalContextCreator: ExternalContextCreator
    ) {
        const commandProducer: ICommandProducer = new RabbitMqCommandProducer(this.amqpConnection, SagaExchangeConfiguration.SetupSagaExchangeRequest);
        const commandReplyConsumer: ICommandReplyConsumer = new RabbitCommandReplyConsumer(this.amqpConnection, SagaExchangeConfiguration.SetupSagaExchangeResponse);
        this.sagaSetupManager = new SagaManager(
            new SetupSaga(amqpConnection, externalContextCreator),
            sagaRepository,
            commandProducer,
            commandReplyConsumer,
            new SagaCommandProducer(commandProducer),
            externalContextCreator);
        this.sagaSetupManager.subscribeToReplyChannel();
    }

    async configure(msg: MessageDto): Promise<void> {
        const sagaData: SetupSagaData = {
            correlationId: msg.correlationId,
            timestamp: msg.payload.timestamp,
            businessId: msg.payload.account.businessId,
            merchantName: msg.payload.account.merchantName,
            paymentMethods: msg.payload.account.paymentMethods.map(pm => pm.toString()),
            trace: {
                status: SetupSagaDataTraceStatus.Init,
                init: { command: SetupSagaDataTraceState.Default },
                cards: { command: SetupSagaDataTraceState.Default, compensation: SetupSagaDataTraceCompensationState.Default },
                payon: { command: SetupSagaDataTraceState.Default, compensation: SetupSagaDataTraceCompensationState.Default },
                acehub: { command: SetupSagaDataTraceState.Default, compensation: SetupSagaDataTraceCompensationState.Default },
                finish: { command: SetupSagaDataTraceState.Default }
            }
        };
        await this.sagaSetupManager.create(msg.correlationId, sagaData);
    }
}
