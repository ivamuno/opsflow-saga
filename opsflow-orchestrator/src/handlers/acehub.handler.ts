import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { AcehubResponsePayload } from './acehubResponsePayload';
import { Command } from '../messaging/command.model'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AcehubHandler {
    @RabbitSubscribe({
        exchange: 'saga-exchange-router',
        routingKey: 'saga-acehub-route-response',
        queue: 'saga-acehub-queue-response'
    })
    async acehubSubHandler(msg: Command<AcehubResponsePayload>) {
        console.log(`Orchrestator.Sub.acehub_configured`, msg.correlationId);
        this.finish(msg);
    }

    async finish(msg: Command<AcehubResponsePayload>) {
        console.log(`Orchrestator.finished`, msg.correlationId);
    }
}
