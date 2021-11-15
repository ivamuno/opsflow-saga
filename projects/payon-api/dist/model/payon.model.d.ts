export declare class Merchant {
    name: string;
    channels: Channel[];
}
export declare class Channel {
    readonly name: string;
    readonly merchantAccount: MerchantAccount[];
    entityId: string;
    constructor(name: string, merchantAccount: MerchantAccount[], entityId?: string);
}
export declare class AmexChannel extends Channel {
    readonly name: string;
    readonly merchantAccount: AmexMerchantAccount[];
    readonly entityId: string;
    constructor(name: string, merchantAccount: AmexMerchantAccount[], entityId?: string);
}
export declare class BcmcChannel extends Channel {
    readonly name: string;
    readonly merchantAccount: BcmcMerchantAccount[];
    readonly entityId: string;
    constructor(name: string, merchantAccount: BcmcMerchantAccount[], entityId?: string);
}
declare class MerchantAccount {
    readonly transactionCategory: string;
    readonly merchantCategory: string;
    readonly currencies: string[];
    readonly customDescriptor: string;
    constructor(transactionCategory: string, merchantCategory: string, currencies: string[], customDescriptor: string);
}
export declare class BcmcMerchantAccount extends MerchantAccount {
    readonly transactionCategory: string;
    readonly merchantCategory: string;
    readonly currencies: string[];
    readonly customDescriptor: string;
    readonly merchantId: string;
    readonly uid: string;
    constructor(transactionCategory: string, merchantCategory: string, currencies: string[], customDescriptor: string, merchantId: string, uid: string);
}
export declare class AmexMerchantAccount extends MerchantAccount {
    readonly transactionCategory: string;
    readonly merchantCategory: string;
    readonly currencies: string[];
    readonly customDescriptor: string;
    readonly cardAcceptorId: string;
    readonly acceptorData: string;
    readonly threeDSecure: boolean;
    constructor(transactionCategory: string, merchantCategory: string, currencies: string[], customDescriptor: string, cardAcceptorId: string, acceptorData: string, threeDSecure: boolean);
}
export {};
