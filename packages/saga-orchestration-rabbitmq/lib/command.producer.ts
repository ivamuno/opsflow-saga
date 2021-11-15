import { AmqpConnection } from "@nestjs-plus/rabbitmq";
import { ICommandProducer, CommandMessage } from "@saga-orchestration/core";

export class RabbitMqCommandProducer implements ICommandProducer {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly exchange: string
    ) { }

    async send(channel: string, command: CommandMessage<any>): Promise<string> {
        console.log('amqpConnection.publish', { exchange: this.exchange, channel, command });
        await this.amqpConnection.publish(this.exchange, channel, command);
        return command.headers.id;
    }
}
