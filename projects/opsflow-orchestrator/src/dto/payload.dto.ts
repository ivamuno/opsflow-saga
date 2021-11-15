import { AccountDto } from "./account.dto";

export interface PayloadDto {
    readonly timestamp: Date;
    readonly account: AccountDto;
}