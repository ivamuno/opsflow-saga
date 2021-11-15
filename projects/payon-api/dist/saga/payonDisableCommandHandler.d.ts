import { SetupService } from "../setup.service";
import * as SagaCommon from "@saga-orchestration/core";
import * as PayOnParticipants from "@opsflow-orchestration/participants/payOn";
export declare class PayOnDisableCommandHandler implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>, PayOnParticipants.PayOnDisable, SagaCommon.CommandReplyMessage<PayOnParticipants.PayOnDisableReply>, PayOnParticipants.PayOnDisableReply> {
    private readonly setupService;
    constructor(setupService: SetupService);
    handle(params: SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>): SagaCommon.CommandReplyMessage<PayOnParticipants.PayOnDisableReply>;
    private mapToDomain;
    private mapFromDomain;
}
