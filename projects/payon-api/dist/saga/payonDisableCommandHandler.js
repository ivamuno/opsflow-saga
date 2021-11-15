"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SagaCommon = require("@saga-orchestration/core");
const PayOnParticipants = require("@opsflow-orchestration/participants/payOn");
class PayOnDisableCommandHandler {
    constructor(setupService) {
        this.setupService = setupService;
    }
    handle(params) {
        const setupServiceRequest = this.mapToDomain(params);
        const setupDisabled = this.setupService.disable(setupServiceRequest);
        return this.mapFromDomain(params, setupDisabled);
    }
    mapToDomain(params) {
        return {
            correlationId: params.sagaHeaders.sagaId,
            payload: params.payload.businessId
        };
    }
    mapFromDomain(params, setupCreated) {
        const reply = new PayOnParticipants.PayOnDisableReply(setupCreated.payload, PayOnParticipants.PayOnAccountStatus.Disabled);
        return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
    }
}
exports.PayOnDisableCommandHandler = PayOnDisableCommandHandler;
//# sourceMappingURL=payonDisableCommandHandler.js.map