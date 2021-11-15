import * as Model from "./model/payon.model";
export declare class SetupService {
    created(request: SetupServiceRequest<Model.Merchant>): SetupServiceResponse<Model.Merchant>;
    disable(request: SetupServiceRequest<string>): SetupServiceResponse<string>;
    addChannels(request: SetupServiceRequest<Model.Channel[]>): SetupServiceResponse<Model.Channel[]>;
    private createChannels;
    disableChannels(request: SetupServiceRequest<string>): SetupServiceResponse<number>;
}
export declare class SetupServiceRequest<T> {
    correlationId: string;
    payload: T;
}
export declare class SetupServiceResponse<T> {
    correlationId: string;
    configurationId: string;
    payload: T;
}
