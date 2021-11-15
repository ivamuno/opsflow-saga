import { CommandMessage, CommandMessageHeaders, SagaCommandHeaders, CommandReplyMessage, CommandReplyMessageHeaders } from '@saga-orchestration/core';

export class AcehubDisable {
  constructor(
    readonly businessId: string,
  ) { }
}

export class AcehubDisableReply {
  constructor(
    readonly businessId: string,
    readonly status: AcehubAccountStatus
  ) { }
}

export class AcehubDisableCommand implements CommandMessage<AcehubDisable> {
  constructor(
    readonly id: string,
    readonly headers: CommandMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: AcehubDisable) { }
}

export class AcehubDisableReplyCommand implements CommandReplyMessage<AcehubDisableReply> {
  constructor(
    readonly id: string,
    readonly headers: CommandReplyMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: AcehubDisableReply) { }
}

export class ErrorAcehubDisableCommand implements CommandReplyMessage<AcehubDisableReply> {
  constructor(
    readonly id: string,
    readonly headers: CommandReplyMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: AcehubDisableReply) { }
}

export enum AcehubAccountStatus {
  Live = 0,
  Disabled = 1
}