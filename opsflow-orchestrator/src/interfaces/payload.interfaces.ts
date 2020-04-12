import { Account } from "./account.interfaces";

export interface Payload {
    readonly timestamp: Date;
    readonly account: Account;    
}