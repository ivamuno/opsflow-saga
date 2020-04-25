export interface Event<T> {
    readonly correlationId: string;
    readonly timestamp: Date;
    readonly name: string;
    readonly payload: T;
}