import { AmqpConnection, Nack, MessageHandlerOptions } from '@nestjs-plus/rabbitmq';
import { ICommandHandler, CommandMessage, CommandReplyMessage, SagaReplyMessageBuilder } from '@saga-orchestration/core/index';
import { ICommandDispatcher } from '@saga-orchestration/core/command.dispatcher';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';

export class CommandDispatcher implements ICommandDispatcher {
  constructor(
    private readonly commandHandlers: [string, ICommandHandler<any, any, any, any>][],
    private readonly externalContextCreator: ExternalContextCreator,
    private readonly amqpConnection: AmqpConnection,
    private readonly exchange: string,
    private readonly msgOptions: MessageHandlerOptions) {
  }

  public async dispatch(): Promise<void> {
    var handler = this.externalContextCreator.create(
      this,
      this.consume,
      'handle'
    );
    this.amqpConnection.createSubscriber(handler, this.msgOptions);
  }

  private async consume(command: CommandMessage<any>): Promise<Nack> {
    await this.handle(command);
    return new Nack();
  }

  private async handle(command: CommandMessage<any>): Promise<void> {
    console.log(`CommandName: ${command.headers.commandType} Requested.`, command.sagaHeaders.sagaId);

    let replyMessage: CommandReplyMessage<any>;
    try {
      const handler: any = this.commandHandlers.find(h => h[0] === command.headers.commandType);
      if (handler === undefined) {
        replyMessage = SagaReplyMessageBuilder.withFailure(command.sagaHeaders, command.headers, `NotFoundReplyCommand`);
        console.log(`CommandHandler not found for: '${command.headers.commandType}'.`, replyMessage.sagaHeaders.sagaId);
      } else {
        replyMessage = handler[1].handle(command);
      }
    } catch (ex) {
      replyMessage = SagaReplyMessageBuilder.withFailure(command.sagaHeaders, command.headers, `ErrorReplyCommand`);
      console.log(`Unexpected exception handling a request for command: '${command.headers.commandType}'.`, replyMessage.sagaHeaders.sagaId, ex);
    }

    console.log(`CommandName: ${replyMessage.headers.commandType}, Outcome: ${replyMessage.headers.outcome}.`, replyMessage.sagaHeaders.sagaId);
    await this.produce(replyMessage);
  }

  private async produce(replyCommand: CommandReplyMessage<any>): Promise<void> {
    console.log('amqpConnection.publish', { exchange: this.exchange, channel: replyCommand.headers.destination, replyCommand });
    await this.amqpConnection.publish(this.exchange, replyCommand.headers.destination, replyCommand);
  }
}
