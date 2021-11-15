export class Account {
    businessId: string;
    merchantName: string;
    credentials: Credentials[];
    channels: Channel[];
}

export class Channel {
    readonly type: ChannelType;
    readonly token: string;
}

export class Credentials {
    readonly user: string;
    readonly pass: string;
}

export enum ChannelType {
    iDeal = 0,
    Cards = 1
}