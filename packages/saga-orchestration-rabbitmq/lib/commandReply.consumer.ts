import { AmqpConnection, SubscribeResponse, MessageHandlerOptions, Nack } from "@nestjs-plus/rabbitmq";
import { Injectable } from "@nestjs/common";
import { CommandReplyMessage, ICommandReplyConsumer } from "@saga-orchestration/core";

@Injectable()
export class RabbitCommandReplyConsumer implements ICommandReplyConsumer {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly exchange: string
    ) { }

    public async subscribe(channel: string, commandReply: (msg: CommandReplyMessage<any>) => Promise<void>) {
        const options: MessageHandlerOptions = {
            exchange: this.exchange,
            routingKey: "",
            queue: channel
        };

        await this.amqpConnection.createSubscriber(this.amqpSubscribe(commandReply), options);
    }

    private amqpSubscribe(commandReply: (msg: CommandReplyMessage<any>) => void): (msg: CommandReplyMessage<any>) => Promise<SubscribeResponse> {
        return async (msg) => {
            try {
                await commandReply(msg);
            } catch (ex) {
                 console.log("ex", ex);
            }

            return new Nack();
        };
    }
}
