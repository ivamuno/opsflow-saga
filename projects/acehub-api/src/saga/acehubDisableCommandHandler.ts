import { SetupService, SetupServiceResponse, SetupServiceRequest } from "../setup.service";
import * as SagaCommon from "@saga-orchestration/core";
import * as AceHubParticipants from "@opsflow-orchestration/participants/aceHub";

export class AceHubDisableCommandHandler
  implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<AceHubParticipants.AcehubDisable>, AceHubParticipants.AcehubDisable, SagaCommon.CommandReplyMessage<AceHubParticipants.AcehubDisableReply>, AceHubParticipants.AcehubDisableReply> {
  constructor(
    private readonly setupService: SetupService,
  ) { }

  public handle(params: SagaCommon.CommandMessage<AceHubParticipants.AcehubDisable>): SagaCommon.CommandReplyMessage<AceHubParticipants.AcehubDisableReply> {
    const setupServiceRequest: SetupServiceRequest<string> = this.mapToDomain(params);

    const setupDisabled: SetupServiceResponse<string> = this.setupService.disable(setupServiceRequest);

    return this.mapFromDomain(params, setupDisabled);
  }

  private mapToDomain(params: SagaCommon.CommandMessage<AceHubParticipants.AcehubDisable>): SetupServiceRequest<string> {
    return {
      correlationId: params.sagaHeaders.sagaId,
      payload: params.payload.businessId
    };
  }

  private mapFromDomain(params: SagaCommon.CommandMessage<AceHubParticipants.AcehubDisable>, setupCreated: SetupServiceResponse<string>)
    : SagaCommon.CommandReplyMessage<AceHubParticipants.AcehubDisableReply> {
    const reply: AceHubParticipants.AcehubDisableReply = new AceHubParticipants.AcehubDisableReply(
      setupCreated.payload,
      AceHubParticipants.AcehubAccountStatus.Disabled
      );

    return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
  }
}
