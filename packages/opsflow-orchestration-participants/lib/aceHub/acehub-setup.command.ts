import { CommandMessage, CommandMessageHeaders, SagaCommandHeaders, CommandReplyMessage, CommandReplyMessageHeaders } from '@saga-orchestration/core';

export class AcehubSetup {
  constructor(
    readonly businessId: string,
    readonly merchantName: string,
    readonly channels: AcehubChannel[]
  ) { }
}

export class AcehubSetupReply {
  constructor(
    readonly businessId: string,
    readonly merchantName: string,
    readonly credentials: AcehubChannelCredentials[],
    readonly channelDetails: AcehubChannelDetails[],
    readonly configurationId: string
  ) { }
}

export class AcehubSetupErrorReply {
  constructor(
    readonly businessId: string,
    readonly message: string
  ) { }
}

export class AcehubSetupCommand implements CommandMessage<AcehubSetup> {
  constructor(
    readonly id: string,
    readonly headers: CommandMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: AcehubSetup) { }
}

export class AcehubSetupReplyCommand implements CommandReplyMessage<AcehubSetupReply> {
  constructor(
    readonly id: string,
    readonly headers: CommandReplyMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: AcehubSetupReply) { }
}

export class AcehubChannelCredentials {
  constructor(
    readonly user: string,
    readonly pass: string
  ) { }
}

export class AcehubChannelDetails {
  constructor(
    readonly channel: AcehubChannel,
    readonly token: string
  ) { }
}

export enum AcehubChannel {
  iDeal = 0,
  Cards = 1
}