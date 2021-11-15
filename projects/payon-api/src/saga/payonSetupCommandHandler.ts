import { SetupService, SetupServiceResponse, SetupServiceRequest } from "../setup.service";
import { Channel, Merchant } from "../model/payon.model";
import * as SagaCommon from "@saga-orchestration/core";
import * as SagaParticipants from "@opsflow-orchestration/participants";

export class PayonSetupCommandHandler
  implements SagaCommon.ICommandHandler<SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>, SagaParticipants.PayOnSetup, SagaCommon.CommandReplyMessage<SagaParticipants.PayOnSetupReply>, SagaParticipants.PayOnSetupReply> {
  constructor(
    private readonly setupService: SetupService,
  ) { }

  public handle(params: SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>): SagaCommon.CommandReplyMessage<SagaParticipants.PayOnSetupReply> {
    const setupServiceRequest: SetupServiceRequest<Merchant> = this.mapToDomain(params);

    const setupCreated: SetupServiceResponse<Merchant> = this.setupService.created(setupServiceRequest);

    return this.mapFromDomain(params, setupCreated);
  }

  private mapToDomain(params: SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>): SetupServiceRequest<Merchant> {
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
          } as Channel;
        })
      }
    };
  }

  private mapFromDomain(params: SagaCommon.CommandMessage<SagaParticipants.PayOnSetup>, setupCreated: SetupServiceResponse<Merchant>)
    : SagaCommon.CommandReplyMessage<SagaParticipants.PayOnSetupReply> {
    const replyChannelDetails: SagaParticipants.PayOnChannelDetails[] = setupCreated.payload.channels.map(c => {
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
      } as Channel;
    });
    const reply: SagaParticipants.PayOnSetupReply = new SagaParticipants.PayOnSetupReply(
      setupCreated.payload.name,
      replyChannelDetails,
      setupCreated.configurationId);

    return SagaCommon.SagaReplyMessageBuilder.withSuccess(params.sagaHeaders, params.headers, reply);
  }
}
