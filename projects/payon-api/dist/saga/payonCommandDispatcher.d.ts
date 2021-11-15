import { AmqpConnection } from "@nestjs-plus/rabbitmq";
import { ExternalContextCreator } from "@nestjs/core/helpers/external-context-creator";
import { SetupService } from "src/setup.service";
export declare class PayOnCommandDispatcher {
    private readonly amqpConnection;
    private readonly setupService;
    private readonly externalContextCreator;
    private commandDispatcher;
    constructor(amqpConnection: AmqpConnection, setupService: SetupService, externalContextCreator: ExternalContextCreator);
}
