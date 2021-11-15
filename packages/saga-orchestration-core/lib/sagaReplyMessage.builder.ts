import { SagaCommandHeaders, CommandMessageHeaders, CommandReplyMessageHeaders, CommandReplyMessage } from "./commandMessage.model";

export enum CommandReplyOutcome {
  Success = 'Success',
  Failure = 'Failure',
}

export class SagaReplyMessageBuilder {
  static withSuccess<T>(sagaCommandHeaders: SagaCommandHeaders, commandMessageHeaders: CommandMessageHeaders, reply: T): CommandReplyMessage<T> {
    return SagaReplyMessageBuilder.with(sagaCommandHeaders, commandMessageHeaders, reply, CommandReplyOutcome.Success);
  }

  static withFailure<T>(sagaCommandHeaders: SagaCommandHeaders, commandMessageHeaders: CommandMessageHeaders, reply: T): CommandReplyMessage<T> {
    return SagaReplyMessageBuilder.with(sagaCommandHeaders, commandMessageHeaders, reply, CommandReplyOutcome.Failure);
  }

  private static with<T>(sagaCommandHeaders: SagaCommandHeaders, commandMessageHeaders: CommandMessageHeaders, reply: T, outcome: CommandReplyOutcome): CommandReplyMessage<T> {
    const now: Date = new Date(Date.now());
    const commandReplyHeaders: CommandReplyMessageHeaders = {
      id: commandMessageHeaders.id,
      commandType: reply.constructor.name,
      outcome: outcome,
      timestamp: now,
      destination: commandMessageHeaders.replyTo
    };
    return {
      sagaHeaders: sagaCommandHeaders,
      headers: commandReplyHeaders,
      payload: reply
    };
  }
}
