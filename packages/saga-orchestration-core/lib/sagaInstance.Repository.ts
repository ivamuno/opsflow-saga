import { SagaInstance } from "./saga.manager";

export interface ISagaInstanceRepository {
    save(sagaInstance: SagaInstance): Promise<void>;
    find(sagaType: string, sagaId: string): Promise<SagaInstance>;
    update(sagaInstance: SagaInstance): Promise<void>;
}
