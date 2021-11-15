import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Post()
  async configure(@Body() msg: MessageDto) {
    this.appService.configure(msg);
    return {
      result: 'Published message',
      correlationId: msg.correlationId
    };
  }
}

