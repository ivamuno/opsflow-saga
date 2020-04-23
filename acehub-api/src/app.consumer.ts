import { MessageDto } from './dto/message.dto';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConsumer {
  constructor(
    private readonly appService: AppService
  ) { }

  @RabbitSubscribe({
    exchange: 'saga-exchange-router',
    routingKey: 'saga-acehub-route-request',
    queue: 'saga-acehub-queue-request'
  })
  async pubSubHandler(msg: MessageDto) {
    console.log(`Acehub.Sub.configure_acehub`, msg.correlationId);
    this.appService.configure(msg);
  }
}
