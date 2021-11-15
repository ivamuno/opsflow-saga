import { PayloadDto } from "./payload.dto";

export interface MessageDto {
    readonly correlationId: string;
    readonly payload: PayloadDto;
}