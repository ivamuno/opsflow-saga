import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { MessageDto } from './dto/message.dto';
import { Command } from './messaging/command.model';
import { Account } from './model/account.model';

@Injectable()
export class AppService {
    constructor(
        private readonly amqpConnection: AmqpConnection
    ) { }

    async configure(msg: MessageDto) {
        console.log(`Orchrestator.Pub.configure_acehub`, msg.correlationId);
        const command: Command<Account> = {
            correlationId: msg.correlationId,
            timestamp: msg.payload.timestamp,
            payload: msg.payload.account,
            state: 'AceHub_Setup_Pending'
        };
        await this.amqpConnection.publish('saga-exchange', 'saga-acehub-route-request', command);
    }
}
