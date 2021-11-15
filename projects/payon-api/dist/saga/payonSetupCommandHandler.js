"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SagaCommon = require("@saga-orchestration/core");
const SagaParticipants = require("@opsflow-orchestration/participants");
class PayonSetupCommandHandler {
    constructor(setupService) {
        this.setupService = setupService;
    }
    handle(params) {
        const setupServiceRequest = this.mapToDomain(params);
        const setupCreated = this.setupService.created(setupServiceRequest);
        return this.mapFromDomain(params, setupCreated);
    }
    mapToDomain(params) {
        return {
            correlationId: params.sagaHeaders.sagaId,
            payload: {
                name: params.payload.merchantName,
                channels: params.payload.channels.map(m => {
                    return {
                        name: m.name,
                        merchantAccount: m.merchantAccount.map(ma => {
                            return {
                                transactionCategory: ma.merchantCategory,
                                merchantCategory: ma.merchantCategory,
                                currencies: ma.currencies,
                                customDescriptor: ma.customDescriptor
                            };
                        })
                    };
                })
            }
        };
    }
    mapFromDomain(params, setupCreated) {
        const replyChannelDetails = setupCreated.payload.channels.map(c => {
            return {
                name: c.name,
                merchantAccount: c.merchantAccount.map(ma => {
                    return {
                        transactionCategory: ma.merchantCategory,
                        merchantCategory: ma.merchantCategory,
                        currencies: ma.currencies,
                        customDescriptor: ma.customDescriptor
                    };
                })
            };
        });
        const reply = new SagaParticipants.PayOnSetupReply(setupCreated.payload.name, replyChannelDetails, setupCreated.configurationId);
        return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
    }
}
exports.PayonSetupCommandHandler = PayonSetupCommandHandler;
//# sourceMappingURL=payonSetupCommandHandler.js.map