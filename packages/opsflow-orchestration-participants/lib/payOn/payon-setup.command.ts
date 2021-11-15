import { CommandMessage, CommandMessageHeaders, SagaCommandHeaders, CommandReplyMessage, CommandReplyMessageHeaders } from '@saga-orchestration/core';

export class PayOnSetup {
  constructor(
    readonly merchantName: string,
    readonly channels: PayOnChannel[]
  ) { }
}

export class PayOnSetupReply {
  constructor(
    readonly merchantName: string,
    readonly channelDetails: PayOnChannelDetails[],
    readonly token: string
  ) { }
}

export class PayOnSetupErrorReply {
  constructor(
    readonly businessId: string,
    readonly message: string
  ) { }
}

export class PayOnSetupCommand implements CommandMessage<PayOnSetup> {
  constructor(
    readonly id: string,
    readonly headers: CommandMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: PayOnSetup) { }
}

export class PayOnSetupReplyCommand implements CommandReplyMessage<PayOnSetupReply> {
  constructor(
    readonly id: string,
    readonly headers: CommandReplyMessageHeaders,
    readonly sagaHeaders: SagaCommandHeaders,
    readonly payload: PayOnSetupReply) { }
}

export class PayOnChannelDetails {
  constructor(
    readonly name: string,
    readonly merchantAccount: PayOnMerchantAccount[],
    readonly entityId: string
  ) { }
}

class PayOnChannel {
  constructor(
    readonly name: string,
    readonly merchantAccount: PayOnMerchantAccount[]
  ) { }
}

export class PayOnAmexChannel extends PayOnChannel {
  constructor(
    readonly name: string,
    readonly merchantAccount: PayOnAmexMerchantAccount[]
  ) {
    super(name, merchantAccount);
  }
}

export class PayOnBcmcChannel extends PayOnChannel {
  constructor(
    readonly name: string,
    readonly merchantAccount: PayOnBcmcMerchantAccount[]
  ) {
    super(name, merchantAccount);
  }
}

class PayOnMerchantAccount {
  constructor(
    readonly transactionCategory: string,
    readonly merchantCategory: string,
    readonly currencies: string[],
    readonly customDescriptor: string
  ) { }
}

export class PayOnBcmcMerchantAccount extends PayOnMerchantAccount {
  constructor(
    readonly transactionCategory: string,
    readonly merchantCategory: string,
    readonly currencies: string[],
    readonly customDescriptor: string,
    readonly merchantId: string,
    readonly uid: string
  ) {
    super(transactionCategory, merchantCategory, currencies, customDescriptor);
  }
}

export class PayOnAmexMerchantAccount extends PayOnMerchantAccount {
  constructor(
    readonly transactionCategory: string,
    readonly merchantCategory: string,
    readonly currencies: string[],
    readonly customDescriptor: string,
    readonly cardAcceptorId: string,
    readonly acceptorData: string,
    readonly threeDSecure: boolean
  ) {
    super(transactionCategory, merchantCategory, currencies, customDescriptor);
  }
}
