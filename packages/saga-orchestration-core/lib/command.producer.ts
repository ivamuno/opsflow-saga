import { CommandWithDestination } from "./saga.definition";
import { CommandMessage } from "./commandMessage.model";

export interface ICommandProducer {
    send(channel: string, command: CommandMessage<any>): Promise<string>;
}

export class SagaCommandProducer {
    public constructor(private readonly commandProducer: ICommandProducer) { }

    async sendCommands(sagaType: string, sagaId: string, commands: CommandWithDestination[]): Promise<string> {
        let messageId: string = null;
        for (const c of commands) {
            c.command.sagaHeaders = { sagaId: sagaId, sagaType: sagaType };
            messageId = await this.commandProducer.send(c.destinationChannel, c.command);
        }

        return messageId;
    }
}