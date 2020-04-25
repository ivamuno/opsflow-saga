export interface AcehubResponsePayload {
    readonly credentials: AcehubCredentials;
    readonly channels: AcehubResponseChannel[];
}

export interface AcehubResponseChannel {
    readonly type: string;
    readonly token: string;
}
export interface AcehubCredentials {
    readonly user: string;
    readonly pass: string;
}