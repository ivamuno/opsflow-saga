"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const common_1 = require("@nestjs/common");
const payonSetupCommandHandler_1 = require("./payonSetupCommandHandler");
const payonDisableCommandHandler_1 = require("./payonDisableCommandHandler");
const payOn_1 = require("@opsflow-orchestration/participants/payOn");
const rabbitmq_2 = require("@saga-orchestration/rabbitmq");
const participants_1 = require("@opsflow-orchestration/participants");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const setup_service_1 = require("../setup.service");
let PayOnCommandDispatcher = class PayOnCommandDispatcher {
    constructor(amqpConnection, setupService, externalContextCreator) {
        this.amqpConnection = amqpConnection;
        this.setupService = setupService;
        this.externalContextCreator = externalContextCreator;
        const commandHandlers = [
            [(new payOn_1.PayOnSetupCommand(null, null, null, null)).constructor.name, new payonSetupCommandHandler_1.PayonSetupCommandHandler(this.setupService)],
            [(new payOn_1.PayOnDisableCommand(null, null, null, null)).constructor.name, new payonDisableCommandHandler_1.PayOnDisableCommandHandler(this.setupService)]
        ];
        const consumerOptions = {
            exchange: participants_1.SagaExchangeConfiguration.SetupSagaExchangeRequest,
            routingKey: "",
            queue: participants_1.SagaPayOnConfiguration.SetupSagaPayOnRequestQueue
        };
        this.commandDispatcher = new rabbitmq_2.CommandDispatcher(commandHandlers, externalContextCreator, amqpConnection, participants_1.SagaExchangeConfiguration.SetupSagaExchangeResponse, consumerOptions);
        this.commandDispatcher.dispatch();
    }
};
PayOnCommandDispatcher = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [rabbitmq_1.AmqpConnection,
        setup_service_1.SetupService,
        external_context_creator_1.ExternalContextCreator])
], PayOnCommandDispatcher);
exports.PayOnCommandDispatcher = PayOnCommandDispatcher;
//# sourceMappingURL=payonCommandDispatcher.js.map