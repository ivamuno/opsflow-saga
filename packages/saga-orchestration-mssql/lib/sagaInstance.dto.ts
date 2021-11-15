export interface ISagaInstanceDto {
    SagaType: string;
    SagaId: string;
    StateName: string;
    LastRequestId: string;
    EndState: boolean;
    Compensating: boolean;
    SagaDataType: string;
    SagaDataJson: string;
}
