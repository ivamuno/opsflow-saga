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
        routingKey: 'saga-ideal-route-response',
        queue: 'saga-ideal-queue-response'
    })
    async iDealSubHandler(msg: MessageDto) {
        console.log(`Orchrestator.Sub.ideal_configured`, msg.correlationId);
        this.idealNext(msg);
    }

    async idealNext(msg: MessageDto) {
        console.log(`Orchrestator.Pub.configure_payon`, msg.correlationId);
        await this.amqpConnection.publish('saga-exchange', 'saga-payon-route-request', msg);
    }

    @RabbitSubscribe({
        exchange: 'saga-exchange-router',
        routingKey: 'saga-payon-route-response',
        queue: 'saga-payon-queue-response'
    })
    async payOnSubHandler(msg: MessageDto) {
        console.log(`Orchrestator.Sub.payon_configured`, msg.correlationId);
        this.payOnNext(msg);
    }

    async payOnNext(msg: MessageDto) {
        console.log(`Orchrestator.Pub.configure_acehub`, msg.correlationId);
        await this.amqpConnection.publish('saga-exchange', 'saga-acehub-route-request', msg);
    }

    @RabbitSubscribe({
        exchange: 'saga-exchange-router',
        routingKey: 'saga-acehub-route-response',
        queue: 'saga-acehub-queue-response'
    })
    async acehubSubHandler(msg: MessageDto) {
        console.log(`Orchrestator.Sub.acehub_configured`, msg.correlationId);
        this.finish(msg);
    }

    async finish(msg: MessageDto) {
        console.log(`Orchrestator.finished`, msg.correlationId);
    }
}
