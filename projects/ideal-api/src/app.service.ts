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
}
