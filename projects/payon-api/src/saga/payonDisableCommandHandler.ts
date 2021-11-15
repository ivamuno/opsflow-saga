import { SetupService, SetupServiceResponse, SetupServiceRequest } from "../setup.service";
import * as SagaCommon from "@saga-orchestration/core";
import * as PayOnParticipants from "@opsflow-orchestration/participants/payOn";

export class PayOnDisableCommandHandler
  implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>, PayOnParticipants.PayOnDisable, SagaCommon.CommandReplyMessage<PayOnParticipants.PayOnDisableReply>, PayOnParticipants.PayOnDisableReply> {
  constructor(
    private readonly setupService: SetupService,
  ) { }

  public handle(params: SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>): SagaCommon.CommandReplyMessage<PayOnParticipants.PayOnDisableReply> {
    const setupServiceRequest: SetupServiceRequest<string> = this.mapToDomain(params);

    const setupDisabled: SetupServiceResponse<string> = this.setupService.disable(setupServiceRequest);

    return this.mapFromDomain(params, setupDisabled);
  }

  private mapToDomain(params: SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>): SetupServiceRequest<string> {
    return {
      correlationId: params.sagaHeaders.sagaId,
      payload: params.payload.businessId
    };
  }

  private mapFromDomain(params: SagaCommon.CommandMessage<PayOnParticipants.PayOnDisable>, setupCreated: SetupServiceResponse<string>)
    : SagaCommon.CommandReplyMessage<PayOnParticipants.PayOnDisableReply> {
    const reply: PayOnParticipants.PayOnDisableReply = new PayOnParticipants.PayOnDisableReply(
      setupCreated.payload,
      PayOnParticipants.PayOnAccountStatus.Disabled
      );

    return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
  }
}
