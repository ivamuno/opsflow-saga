import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { MerchantCreationResponsePayload } from './model/merchantCreationResponsePayload';
import { Command } from './messaging/command.model';

@Injectable()
export class AppService {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  async configure(msg: any) {
    const reply: Command<MerchantCreationResponsePayload> = {
      correlationId: msg.correlationId,
      state: 'AceHub_Setup_Completed',
      timestamp: msg.timestamp,
      payload: {
        channels: msg.payload.paymentMethods.map(m => { return { type: m, token: `token_{type}` } }),
        credentials: {
          user: `user_${msg.payload.businessId}`,
          pass: `pass_${msg.payload.businessId}`
        }
      }
    }
    await this.amqpConnection.publish('saga-exchange', 'saga-acehub-route-response', reply);
    console.log(`Acehub.Pub.acehub_configured`, msg.correlationId);
  }
}
