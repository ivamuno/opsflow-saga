import { SagaInstance, ISagaInstanceRepository } from "@saga-orchestration/core";
import { Entity, Column, Repository, FindConditions, PrimaryColumn } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class SagaInstanceRepository implements ISagaInstanceRepository {
    constructor(
        @Inject("SAGA_INSTANCE_REPOSITORY")
        private readonly sagaInstanceRepository: Repository<SagaInstanceDto>
    ) { }

    public async save(sagaInstance: SagaInstance): Promise<void> {
        const sagaInstanceDto : SagaInstanceDto = this.mapFrom(sagaInstance);
        await this.sagaInstanceRepository.insert(sagaInstanceDto);
    }

    public async find(sagaType: string, sagaId: string): Promise<SagaInstance> {
        const condition: FindConditions<SagaInstanceDto> = {
            SagaType: sagaType,
            SagaId: sagaId
        };
        const result: SagaInstanceDto = await this.sagaInstanceRepository.findOne(condition);
        return this.mapTo(result);
    }

    public async update(sagaInstance: SagaInstance): Promise<void> {
        const condition: FindConditions<SagaInstanceDto> = {
            SagaType: sagaInstance.sagaType,
            SagaId: sagaInstance.id
        };
        const sagaInstanceDto : SagaInstanceDto = this.mapFrom(sagaInstance);
        await this.sagaInstanceRepository.update(condition, sagaInstanceDto);
    }

    private mapFrom(sagaInstance: SagaInstance): SagaInstanceDto {
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
    private mapTo(sagaInstanceDto: SagaInstanceDto): SagaInstance {
        return new SagaInstance(
            sagaInstanceDto.SagaType,
            sagaInstanceDto.SagaId,
            sagaInstanceDto.StateName,
            sagaInstanceDto.LastRequestId,
            sagaInstanceDto.SagaDataJson,
            new Set<string>(),
            sagaInstanceDto.EndState,
            sagaInstanceDto.Compensating
        );
    }
}

@Entity({ database: "OpsFlow", schema: "Saga", name: "Instance" })
export class SagaInstanceDto {
    @PrimaryColumn()
    SagaType: string;

    @PrimaryColumn()
    SagaId: string;

    @Column()
    StateName: string;

    @Column()
    LastRequestId: string;

    @Column()
    EndState: boolean;

    @Column()
    Compensating: boolean;

    @Column()
    SagaDataType: string;

    @Column()
    SagaDataJson: string;
}
