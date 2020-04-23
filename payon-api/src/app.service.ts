import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { RabbitSubscribe, AmqpConnection } from '@nestjs-plus/rabbitmq';

@Injectable()
export class AppService {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  @RabbitSubscribe({
    exchange: 'saga-exchange-router',
    routingKey: 'saga-payon-route-request',
    queue: 'saga-payon-queue-request'
  })
  async pubSubHandler(msg: MessageDto) {
    console.log(`PayOn.Sub.configure_payon`, msg.correlationId);
    this.configure(msg);
  }

  async configure(msg: MessageDto) {
    await this.amqpConnection.publish('saga-exchange', 'saga-payon-route-response', msg);
    console.log(`PayOn.Pub.payon_configured`, msg.correlationId);
  }
}
