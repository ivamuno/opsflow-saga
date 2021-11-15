import { AmqpConnection, MessageHandlerOptions } from "@nestjs-plus/rabbitmq";
import { Injectable } from "@nestjs/common";
import { ExternalContextCreator } from "@nestjs/core/helpers/external-context-creator";

import { CommandDispatcher } from "@saga-orchestration/rabbitmq";
import { ICommandDispatcher } from "@saga-orchestration/core/command.dispatcher";
import { ICommandHandler, CommandMessage, CommandReplyMessage } from "@saga-orchestration/core";
import { SagaExchangeConfiguration } from "@opsflow-orchestration/participants/saga-exchange.config";
import { AcehubSetupCommand, AcehubDisableCommand, SagaAceHubConfiguration } from "@opsflow-orchestration/participants/aceHub";

import { AcehubSetupCommandHandler } from "./acehubSetupCommandHandler";
import { SetupService } from "../setup.service";
import { AceHubDisableCommandHandler } from "./acehubDisableCommandHandler";

@Injectable()
export class AcehubCommandDispatcher {
	private commandDispatcher: ICommandDispatcher;

	constructor(
		private readonly amqpConnection: AmqpConnection,
		private readonly setupService: SetupService,
		private readonly externalContextCreator: ExternalContextCreator
	) {
		const commandHandlers:
			[string, ICommandHandler<CommandMessage<any>, any, CommandReplyMessage<any>, any>][]
			= [
				[(new AcehubSetupCommand(null, null, null, null)).constructor.name, new AcehubSetupCommandHandler(this.setupService)],
				[(new AcehubDisableCommand(null, null, null, null)).constructor.name, new AceHubDisableCommandHandler(this.setupService)]
			];

		const consumerOptions: MessageHandlerOptions = {
			exchange: SagaExchangeConfiguration.SetupSagaExchangeRequest,
			routingKey: "",
			queue: SagaAceHubConfiguration.SetupSagaAcehubRequestQueue
		};
		this.commandDispatcher = new CommandDispatcher(commandHandlers, externalContextCreator, amqpConnection, SagaExchangeConfiguration.SetupSagaExchangeResponse, consumerOptions);
		this.commandDispatcher.dispatch();
	}
}
