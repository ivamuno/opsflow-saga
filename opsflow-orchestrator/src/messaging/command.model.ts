export interface Command<T> {
    readonly correlationId: string;
    readonly timestamp: Date;
    readonly state: string;
    readonly payload: T;
}