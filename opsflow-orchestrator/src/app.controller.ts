import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly amqpConnection: AmqpConnection
  ) { }

  @Post()
  async configure(@Body() msg: MessageDto) {
    console.log(`Orchrestator.Pub.configure_ideal`, msg.correlationId);
    await this.amqpConnection.publish('saga-exchange', 'saga-ideal-route-request', msg);
    return {
      result: 'Published message',
      correlationId: msg.correlationId
    };
  }
}

