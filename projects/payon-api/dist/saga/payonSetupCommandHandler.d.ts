import { SetupService } from "../setup.service";
import * as SagaCommon from "@saga-orchestration/core";
import * as SagaParticipants from "@opsflow-orchestration/participants";
export declare class PayonSetupCommandHandler implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>, SagaParticipants.PayOnSetup, SagaCommon.CommandReplyMessage<SagaParticipants.PayOnSetupReply>, SagaParticipants.PayOnSetupReply> {
    private readonly setupService;
    constructor(setupService: SetupService);
    handle(params: SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>): SagaCommon.CommandReplyMessage<SagaParticipants.PayOnSetupReply>;
    private mapToDomain;
    private mapFromDomain;
}
