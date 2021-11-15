import { CommandMessage, CommandReplyMessage } from './commandMessage.model';

export interface ICommandHandler<T1 extends CommandMessage<T2>, T2, T3 extends CommandReplyMessage<T4>, T4> {
    handle(params: T1): T3;
}