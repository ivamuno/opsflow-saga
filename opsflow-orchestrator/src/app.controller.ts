import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountDto } from './dto/account.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  configure(@Body() account: AccountDto): string {
    return this.appService.configure(account);
  }
}

