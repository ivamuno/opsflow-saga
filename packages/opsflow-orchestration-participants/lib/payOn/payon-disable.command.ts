import { CommandMessage, CommandMessageHeaders, SagaCommandHeaders, CommandReplyMessage, CommandReplyMessageHeaders } from '@saga-orchestration/core';

export class PayOnDisable {
  constructor(
    readonly businessId: string,
  ) { }
}

export class PayOnDisableReply {
  constructor(
    readonly businessId: string,
    readonly status: PayOnAccountStatus
  ) { }
}

export class PayOnDisableErrorReply {
  constructor(
    readonly businessId: string,
    readonly message: string
  ) { }
}

export class PayOnDisableCommand implements CommandMessage<PayOnDisable> {
  constructor(
    readonly id: string,
    readonly headers: CommandMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: PayOnDisable) { }
}

export class PayOnDisableReplyCommand implements CommandReplyMessage<PayOnDisableReply> {
  constructor(
    readonly id: string,
    readonly headers: CommandReplyMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: PayOnDisableReply) { }
}

export enum PayOnAccountStatus {
  Live = 0,
  Disabled = 1
}