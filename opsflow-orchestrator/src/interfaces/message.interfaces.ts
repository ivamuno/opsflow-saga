import { Payload } from "./payload.interfaces";

export interface Message {
    readonly correlationId: string;
    readonly payload: Payload;
}