import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { RabbitSubscribe, AmqpConnection } from '@nestjs-plus/rabbitmq';

@Injectable()
export class AppService {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  getHello(): string {
    return 'Hello IdealApi!';
  }

  @RabbitSubscribe({
    exchange: 'saga-exchange-router',
    routingKey: 'saga-ideal-route-request',
    queue: 'saga-ideal-queue-request'
  })
  async pubSubHandler(msg: MessageDto) {
    console.log(`iDeal.Sub.configure_ideal`, msg.correlationId);
    this.configure(msg);
  }

  async configure(msg: MessageDto) {
    await this.amqpConnection.publish('saga-exchange', 'saga-ideal-route-response', msg);
    console.log(`iDeal.Pub.ideal_configured`, msg.correlationId);
  }
}
