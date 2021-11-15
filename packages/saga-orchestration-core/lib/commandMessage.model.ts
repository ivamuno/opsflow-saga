export class SagaCommandHeaders{
    sagaType: string;
    sagaId: string;
}

export class CommandMessageHeaders{
    id: string;
    commandType: string;
    destination: string;
    replyTo: string;
    timestamp: Date;
}

export class CommandMessage<T> {
    headers: CommandMessageHeaders;
    sagaHeaders: SagaCommandHeaders;
    payload: T;
}

export class CommandReplyMessageHeaders {
    id: string;
    commandType: string;
    destination: string;
    outcome: string;
    timestamp: Date;
}

export class CommandReplyMessage<T> {
    headers: CommandReplyMessageHeaders;
    sagaHeaders: SagaCommandHeaders;
    payload: T;
}
