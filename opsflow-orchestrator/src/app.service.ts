import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interfaces';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AppService {
  configure(account: AccountDto): string {
    const message: Message = {
      correlationId: uuidv4(),
      payload: {
        timestamp: new Date(Date.now()),
        account: account
      }
    }

    this.produce(message);
    return message.correlationId;
  }

  private produce(message: Message) {
    console.log(`Orchrestator.Produce.Message`, message);
  }

  private consume() {

  }
}
