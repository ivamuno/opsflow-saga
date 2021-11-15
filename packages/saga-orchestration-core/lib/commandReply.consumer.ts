import { CommandReplyMessage } from "./commandMessage.model";

export interface ICommandReplyConsumer {
    subscribe(channel: string, commandReply: (msg: CommandReplyMessage<any>) => Promise<void>);
}
