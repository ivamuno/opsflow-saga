import { Repository, FindConditions } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { ISagaInstanceRepository, SagaInstance } from "@saga-orchestration/core";
import { ISagaInstanceDto } from "./sagaInstance.dto";

@Injectable()
export class SagaInstanceRepository implements ISagaInstanceRepository {
    constructor(
        @Inject("SAGA_INSTANCE_REPOSITORY")
        private readonly sagaInstanceRepository: Repository<ISagaInstanceDto>
    ) { }

    public async save(sagaInstance: SagaInstance): Promise<void> {
        const sagaInstanceDto : ISagaInstanceDto = this.mapFrom(sagaInstance);
        await this.sagaInstanceRepository.insert(sagaInstanceDto);
    }

    public async find(sagaType: string, sagaId: string): Promise<SagaInstance> {
        const condition: FindConditions<ISagaInstanceDto> = {
            SagaType: sagaType,
            SagaId: sagaId
        };
        const result: ISagaInstanceDto = await this.sagaInstanceRepository.findOne(condition);
        return this.mapTo(result);
    }

    public async update(sagaInstance: SagaInstance): Promise<void> {
        const condition: FindConditions<ISagaInstanceDto> = {
            SagaType: sagaInstance.sagaType,
            SagaId: sagaInstance.id
        };
        const sagaInstanceDto : ISagaInstanceDto = this.mapFrom(sagaInstance);
        await this.sagaInstanceRepository.update(condition, sagaInstanceDto);
    }

    private mapFrom(sagaInstance: SagaInstance): ISagaInstanceDto {
        return {
            SagaType: sagaInstance.sagaType,
            SagaId: sagaInstance.id,
            Compensating: sagaInstance.compensating,
            EndState: sagaInstance.endState,
            LastRequestId: sagaInstance.lastRequestId,
            SagaDataJson: sagaInstance.serializedSagaData,
            SagaDataType: sagaInstance.sagaType,
            StateName: sagaInstance.stateName
        };
    }
    private mapTo(sagaInstanceDto: ISagaInstanceDto): SagaInstance {
        return {
            sagaType: sagaInstanceDto.SagaType,
            id: sagaInstanceDto.SagaId,
            compensating: sagaInstanceDto.Compensating,
            endState: sagaInstanceDto.EndState,
            lastRequestId: sagaInstanceDto.LastRequestId,
            serializedSagaData: sagaInstanceDto.SagaDataJson,
            stateName: sagaInstanceDto.StateName,
            destinations: new Set<string>()
        };
    }
}
