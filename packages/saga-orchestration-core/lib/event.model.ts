export class Event<T> {
    correlationId: string;
    timestamp: Date;
    name: string;
    payload: T;
}