export class Merchant {
    name: string;
    channels: Channel[];
}

export class Channel {
    constructor(
        readonly name: string,
        readonly merchantAccount: MerchantAccount[],
        public entityId: string = undefined
    ) { }
}

export class AmexChannel extends Channel {
    constructor(
        readonly name: string,
        readonly merchantAccount: AmexMerchantAccount[],
        readonly entityId: string = undefined
    ) {
        super(name, merchantAccount, entityId);
    }
}

export class BcmcChannel extends Channel {
    constructor(
        readonly name: string,
        readonly merchantAccount: BcmcMerchantAccount[],
        readonly entityId: string = undefined
    ) {
        super(name, merchantAccount, entityId);
    }
}

class MerchantAccount {
    constructor(
        readonly transactionCategory: string,
        readonly merchantCategory: string,
        readonly currencies: string[],
        readonly customDescriptor: string
    ) { }
}

export class BcmcMerchantAccount extends MerchantAccount {
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

export class AmexMerchantAccount extends MerchantAccount {
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
