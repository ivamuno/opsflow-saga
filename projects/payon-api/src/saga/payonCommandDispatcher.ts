import { AmqpConnection, MessageHandlerOptions } from "@nestjs-plus/rabbitmq";
import { Injectable } from "@nestjs/common";
import { PayonSetupCommandHandler } from "./payonSetupCommandHandler";
import { PayOnDisableCommandHandler } from "./payonDisableCommandHandler";

import { PayOnSetupCommand, PayOnDisableCommand } from "@opsflow-orchestration/participants/payOn";
import { CommandDispatcher } from "@saga-orchestration/rabbitmq";
import { ICommandDispatcher } from "@saga-orchestration/core/command.dispatcher";
import { ICommandHandler, CommandMessage, CommandReplyMessage } from "@saga-orchestration/core";
import { SagaExchangeConfiguration, SagaPayOnConfiguration } from "@opsflow-orchestration/participants";
import { ExternalContextCreator } from "@nestjs/core/helpers/external-context-creator";
import { SetupService } from "src/setup.service";

@Injectable()
export class PayOnCommandDispatcher {
	private commandDispatcher: ICommandDispatcher;

	constructor(
		private readonly amqpConnection: AmqpConnection,
		private readonly setupService: SetupService,
		private readonly externalContextCreator: ExternalContextCreator
	) {
		const commandHandlers:
			[string, ICommandHandler<CommandMessage<any>, any, CommandReplyMessage<any>, any>][]
			= [
				[(new PayOnSetupCommand(null, null, null, null)).constructor.name, new PayonSetupCommandHandler(this.setupService)],
				[(new PayOnDisableCommand(null, null, null, null)).constructor.name, new PayOnDisableCommandHandler(this.setupService)]
			];

		const consumerOptions: MessageHandlerOptions = {
			exchange: SagaExchangeConfiguration.SetupSagaExchangeRequest,
			routingKey: "",
			queue: SagaPayOnConfiguration.SetupSagaPayOnRequestQueue
		};
		this.commandDispatcher = new CommandDispatcher(commandHandlers, externalContextCreator, amqpConnection, SagaExchangeConfiguration.SetupSagaExchangeResponse, consumerOptions);
		this.commandDispatcher.dispatch();
	}
}
