import { SetupService, SetupServiceResponse, SetupServiceRequest } from "../setup.service";
import { Channel, Account } from "../model/acehub.model";
import * as SagaCommon from "@saga-orchestration/core";
import * as SagaParticipants from "@opsflow-orchestration/participants/aceHub";

export class AcehubSetupCommandHandler
  implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<SagaParticipants.AcehubSetup>, SagaParticipants.AcehubSetup, SagaCommon.CommandReplyMessage<SagaParticipants.AcehubSetupReply>, SagaParticipants.AcehubSetupReply> {
  constructor(
    private readonly setupService: SetupService,
  ) { }

  public handle(params: SagaCommon.CommandMessage<SagaParticipants.AcehubSetup>): SagaCommon.CommandReplyMessage<SagaParticipants.AcehubSetupReply> {
    const setupServiceRequest: SetupServiceRequest<Account> = this.mapToDomain(params);

    const setupCreated: SetupServiceResponse<Account> = this.setupService.created(setupServiceRequest);

    return this.mapFromDomain(params, setupCreated);
  }

  private mapToDomain(params: SagaCommon.CommandMessage<SagaParticipants.AcehubSetup>): SetupServiceRequest<Account> {
    return {
      correlationId: params.sagaHeaders.sagaId,
      payload: {
        businessId: params.payload.businessId,
        merchantName: params.payload.merchantName,
        credentials: null,
        channels: params.payload.channels.map(m => {
          return { type: m as number, token: "" } as Channel;
        })
      }
    };
  }

  private mapFromDomain(params: SagaCommon.CommandMessage<SagaParticipants.AcehubSetup>, setupCreated: SetupServiceResponse<Account>)
    : SagaCommon.CommandReplyMessage<SagaParticipants.AcehubSetupReply> {
    const replyCredentials: SagaParticipants.AcehubChannelCredentials[] = setupCreated.payload.credentials.map(c => {
      return { user: c.user, pass: c.pass } as SagaParticipants.AcehubChannelCredentials;
    });
    const replyChannelDetails: SagaParticipants.AcehubChannelDetails[] = setupCreated.payload.channels.map(c => {
      return { channel: c.type as number, token: c.token } as SagaParticipants.AcehubChannelDetails;
    });
    const reply: SagaParticipants.AcehubSetupReply = new SagaParticipants.AcehubSetupReply(
      setupCreated.payload.businessId,
      setupCreated.payload.merchantName,
      replyCredentials,
      replyChannelDetails,
      setupCreated.configurationId);

    return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
  }
}
