import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Injectable()
export class AppService {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  async configure(msg: MessageDto) {
    await this.amqpConnection.publish('saga-exchange', 'saga-acehub-route-response', msg);
    console.log(`Acehub.Pub.acehub_configured`, msg.correlationId);
  }
}
