"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Merchant {
}
exports.Merchant = Merchant;
class Channel {
    constructor(name, merchantAccount, entityId = undefined) {
        this.name = name;
        this.merchantAccount = merchantAccount;
        this.entityId = entityId;
    }
}
exports.Channel = Channel;
class AmexChannel extends Channel {
    constructor(name, merchantAccount, entityId = undefined) {
        super(name, merchantAccount, entityId);
        this.name = name;
        this.merchantAccount = merchantAccount;
        this.entityId = entityId;
    }
}
exports.AmexChannel = AmexChannel;
class BcmcChannel extends Channel {
    constructor(name, merchantAccount, entityId = undefined) {
        super(name, merchantAccount, entityId);
        this.name = name;
        this.merchantAccount = merchantAccount;
        this.entityId = entityId;
    }
}
exports.BcmcChannel = BcmcChannel;
class MerchantAccount {
    constructor(transactionCategory, merchantCategory, currencies, customDescriptor) {
        this.transactionCategory = transactionCategory;
        this.merchantCategory = merchantCategory;
        this.currencies = currencies;
        this.customDescriptor = customDescriptor;
    }
}
class BcmcMerchantAccount extends MerchantAccount {
    constructor(transactionCategory, merchantCategory, currencies, customDescriptor, merchantId, uid) {
        super(transactionCategory, merchantCategory, currencies, customDescriptor);
        this.transactionCategory = transactionCategory;
        this.merchantCategory = merchantCategory;
        this.currencies = currencies;
        this.customDescriptor = customDescriptor;
        this.merchantId = merchantId;
        this.uid = uid;
    }
}
exports.BcmcMerchantAccount = BcmcMerchantAccount;
class AmexMerchantAccount extends MerchantAccount {
    constructor(transactionCategory, merchantCategory, currencies, customDescriptor, cardAcceptorId, acceptorData, threeDSecure) {
        super(transactionCategory, merchantCategory, currencies, customDescriptor);
        this.transactionCategory = transactionCategory;
        this.merchantCategory = merchantCategory;
        this.currencies = currencies;
        this.customDescriptor = customDescriptor;
        this.cardAcceptorId = cardAcceptorId;
        this.acceptorData = acceptorData;
        this.threeDSecure = threeDSecure;
    }
}
exports.AmexMerchantAccount = AmexMerchantAccount;
//# sourceMappingURL=payon.model.js.map