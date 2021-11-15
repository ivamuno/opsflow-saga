import { CommandReplyMessage, CommandMessage } from "./commandMessage.model";
import { CommandReplyOutcome } from "./sagaReplyMessage.builder";

export abstract class ISaga<T> {
    protected sagaDefinition: SagaDefinition<T>;

    getSagaDefinition(): SagaDefinition<T> {
        return this.sagaDefinition;
    }

    getSagaType(): string {
        return this.constructor.name;
    }

    getSagaResponseChannel(): string {
        return `saga-${this.getSagaType()}-response`;
    }

    step(): StepBuilder<T> {
        const sagaDefinitionBuilder = new SagaDefinitionBuilder<T>();
        return new StepBuilder<T>(sagaDefinitionBuilder);
    }

    onStarting(sagaId: string, data: T): void { }
    onSagaCompletedSuccessfully(sagaId: string, data: T): void { }
    onSagaRolledBack(sagaId: string, data: T): void { }
}

export interface ISagaDefinition<T> {
    start(sagaData: T): SagaActions<T>;
    handleReply(currentState: string, sagaData: T, message: CommandReplyMessage<T>): SagaActions<T>;
}

export class SagaDefinition<T> implements ISagaDefinition<T> {
    public constructor(
        private readonly sagaSteps: ISagaStep<T>[]
    ) {
    }

    start(sagaData: T): SagaActions<T> {
        const currentState: SagaExecutionState = new SagaExecutionState(-1, false);
        return this.executeNextStep(sagaData, currentState);
    }

    handleReply(currentState: string, sagaData: T, message: CommandReplyMessage<any>): SagaActions<T> {
        const stateTemp: SagaExecutionState = JSON.parse(currentState) as SagaExecutionState;
        const state: SagaExecutionState = new SagaExecutionState(stateTemp.currentlyExecuting, stateTemp.compensating, stateTemp.endState);
        const currentStep: ISagaStep<T> = this.sagaSteps[state.currentlyExecuting];
        const compensating: boolean = state.compensating;

        const replyHandler = currentStep.getReplyHandler(message, compensating);
        if (replyHandler) {
            replyHandler(sagaData, message.payload);
        }

        if (currentStep.isSuccessfulReply(message, compensating)) {
            return this.executeNextStep(sagaData, state);
        } else if (compensating) {
            throw new Error("Failure when compensating");
        }

        return this.executeNextStep(sagaData, state.startCompensating());
    }

    private executeNextStep(data: T, state: SagaExecutionState): SagaActions<T> {
        const stepToExecute: StepToExecute<T> = this.nextStepToExecute(state, data);
        if (stepToExecute.isEmpty()) {
            return this.makeEndStateSagaActions(state);
        }

        return stepToExecute.executeStep(data, state);
    }

    private nextStepToExecute(state: SagaExecutionState, data: T): StepToExecute<T> {
        const compensating: boolean = state.compensating;
        const direction: number = compensating ? -1 : +1;
        let skipped: number = 0;
        for (let i: number = state.currentlyExecuting + direction; i >= 0 && i < this.sagaSteps.length; i = i + direction) {
            let step: ISagaStep<T> = this.sagaSteps[i];
            if ((compensating ? step.hasCompensation(data) : step.hasAction(data))) {
                return new StepToExecute<T>(step, skipped, compensating);
            } else {
                skipped++;
            }
        }

        return new StepToExecute<T>(null, skipped, compensating);
    }

    private makeEndStateSagaActions(state: SagaExecutionState): SagaActions<T> {
        return new SagaActions<T>([], null, JSON.stringify(SagaExecutionState.makeEndState()), true, state.compensating);
    }
}

class StepToExecute<T> {
    public constructor(
        private readonly step: ISagaStep<T>,
        private readonly skipped: number,
        private readonly compensating: boolean
    ) { }

    private size(): number {
        return (this.step ? 1 : 0) + this.skipped;
    }

    public executeStep(data: T, currentState: SagaExecutionState): SagaActions<T> {
        const newState: SagaExecutionState = currentState.nextState(this.size());
        const compensating: boolean = currentState.compensating;

        const commands: CommandWithDestination[] = [];
        this.step.makeStepOutcome(data, this.compensating).visit(cc => { cc.forEach(c => commands.push(c)); });

        return new SagaActions<T>(commands, data, JSON.stringify(newState), newState.endState, compensating);
    }

    public isEmpty(): boolean {
        return !this.step;
    }
}

class SagaExecutionState {
    public constructor(
        readonly currentlyExecuting: number = 0,
        readonly compensating: boolean = false,
        public endState: boolean = false
    ) { }

    public startCompensating(): SagaExecutionState {
        return new SagaExecutionState(this.currentlyExecuting, true);
    }

    public nextState(size: number): SagaExecutionState {
        return new SagaExecutionState(this.compensating ? this.currentlyExecuting - size : this.currentlyExecuting + size, this.compensating);
    }

    public static makeEndState(): SagaExecutionState {
        const x: SagaExecutionState = new SagaExecutionState();
        x.endState = true;
        return x;
    }
}

interface ISagaStep<T> {
    isSuccessfulReply(message: CommandReplyMessage<T>, compensating: boolean): boolean;

    getReplyHandler(message: CommandReplyMessage<T>, compensating: boolean): (data: T, rawReply: any) => void;

    makeStepOutcome(data: T, compensating: boolean): StepOutcome<T>;

    hasAction(data: T): boolean;

    hasCompensation(data: T): boolean;
}

export class StepBuilder<T> {
    constructor(private parent: SagaDefinitionBuilder<T>) { }

    public invokeParticipant(action: (data: T) => CommandWithDestination, participantInvocationPredicate: (data: T) => boolean = data => true): InvokeParticipantStepBuilder<T> {
        return new InvokeParticipantStepBuilder(this.parent).withAction(action, participantInvocationPredicate);
    }
}

class InvokeParticipantStepBuilder<T> {
    private action: ParticipantInvocation<T>;
    private compensation: ParticipantInvocation<T>;
    private actionReplyHandlers: [string, (data: T, rawReply: any) => void][] = [];
    private compensationReplyHandlers: [string, (data: T, rawReply: any) => void][] = [];

    constructor(
        private parent: SagaDefinitionBuilder<T>
    ) { }

    public withAction(action: (data: T) => CommandWithDestination, predicate: (data: T) => boolean = data => true): InvokeParticipantStepBuilder<T> {
        this.action = new ParticipantInvocation(action, predicate);
        return this;
    }

    public withCompensation(compensation: (data: T) => CommandWithDestination, predicate: (data: T) => boolean = data => true): InvokeParticipantStepBuilder<T> {
        this.compensation = new ParticipantInvocation(compensation, predicate);
        return this;
    }

    public onReply(replierName: string, replyHandler: (data: T, rawReply: any) => void): InvokeParticipantStepBuilder<T> {
        if (this.compensation) {
            this.compensationReplyHandlers[replierName] = (d, r) => replyHandler(d, r);
        }
        else {
            this.actionReplyHandlers[replierName] = (d, r) => replyHandler(d, r);
        }

        return this;
    }

    public step(): StepBuilder<T> {
        this.addStep();
        return new StepBuilder(this.parent);
    }

    public build(): SagaDefinition<T> {
        // TODO see comment in local step
        this.addStep();
        return this.parent.build();
    }

    private addStep(): void {
        this.parent.addStep(new ParticipantInvocationStep<T>(this.action, this.compensation, this.actionReplyHandlers, this.compensationReplyHandlers));
    }
}

class ParticipantInvocationStep<T> implements ISagaStep<T>{
    constructor(
        private readonly participantInvocation: ParticipantInvocation<T>,
        private readonly compensation: ParticipantInvocation<T>,
        private readonly actionReplyHandlers: [string, (data: T, rawReply: any) => void][] = [],
        private readonly compensationReplyHandlers: [string, (data: T, rawReply: any) => void][] = []
    ) { }

    private getParticipantInvocation(compensating: boolean): ParticipantInvocation<T> {
        return compensating ? this.compensation : this.participantInvocation;
    }

    public isSuccessfulReply(message: CommandReplyMessage<any>, compensating: boolean): boolean {
        return this.getParticipantInvocation(compensating).isSuccessfulReply(message);
    }

    public getReplyHandler(message: CommandReplyMessage<any>, compensating: boolean): (data: T, rawReply: any) => void {
        const replyType: string = message.headers.commandType;
        return (compensating ? this.compensationReplyHandlers : this.actionReplyHandlers)[replyType];
    }

    public makeStepOutcome(data: T, compensating: boolean) {
        // TODO: Check why it works with a list.
        const commandsToSend: CommandWithDestination[] = [this.getParticipantInvocation(compensating).makeCommandToSend(data)];
        return StepOutcome.makeRemoteStepOutcome(commandsToSend);
    }

    public hasAction(data: T): boolean {
        return this.participantInvocation && this.participantInvocation.isInvocable(data);
    }

    public hasCompensation(data: T): boolean {
        return this.compensation && this.compensation.isInvocable(data);
    }
}

class ParticipantInvocation<T> {
    constructor(
        private readonly commandBuilder: (data: T) => CommandWithDestination,
        private readonly predicate: (data: T) => boolean
    ) { }

    public isInvocable(data: T): boolean {
        return this.predicate(data);
    }

    public isSuccessfulReply(reply: CommandReplyMessage<any>): boolean {
        return CommandReplyOutcome.Success === reply.headers.outcome;
    }

    public makeCommandToSend(data: T): CommandWithDestination {
        return this.commandBuilder(data);
    }
}

class StepOutcome<T> {
    constructor(
        private readonly commandsToSend: CommandWithDestination[]
    ) { }

    public static makeRemoteStepOutcome<T>(commandsToSend: CommandWithDestination[]): StepOutcome<T> {
        return new StepOutcome<T>(commandsToSend);
    }

    public visit(commandsConsumer: (commands: CommandWithDestination[]) => void): void {
        commandsConsumer(this.commandsToSend);
    }
}

export class SagaDefinitionBuilder<T> {
    private sagaSteps: ISagaStep<T>[] = [];

    public addStep(sagaStep: ISagaStep<T>): void {
        this.sagaSteps.push(sagaStep);
    }

    public build(): SagaDefinition<T> {
        return new SagaDefinition<T>(this.sagaSteps);
    }
}

export class SagaActions<T> {
    constructor(
        public readonly commands: CommandWithDestination[],
        public readonly updatedSagaData: T,
        public readonly updatedState: string,
        public readonly endState: boolean,
        public readonly compensating: boolean
    ) { }

}

export class CommandWithDestination {
    constructor(
        public readonly destinationChannel: string,
        public readonly command: CommandMessage<any>
    ) { }
}

export class CommandWithDestinationBuilder<T> {
    private destinationChannel: string;

    constructor(
        private readonly command: CommandMessage<T>
    ) { }

    public static send<T>(command: CommandMessage<T>): CommandWithDestinationBuilder<T> {
        return new CommandWithDestinationBuilder(command);
    }

    public to(destinationChannel: string): CommandWithDestinationBuilder<T> {
        this.destinationChannel = destinationChannel;
        return this;
    }

    public build(): CommandWithDestination {
        return new CommandWithDestination(this.destinationChannel, this.command);
    }
}
