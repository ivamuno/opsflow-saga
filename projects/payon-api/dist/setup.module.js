"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const common_1 = require("@nestjs/common");
const setup_controller_1 = require("./setup.controller");
const payonCommandDispatcher_1 = require("./saga/payonCommandDispatcher");
const setup_service_1 = require("./setup.service");
let SetupModule = class SetupModule {
};
SetupModule = __decorate([
    common_1.Module({
        imports: [
            rabbitmq_1.RabbitMQModule.forRootAsync({
                useFactory: () => ({ uri: process.env.RABBIT_URL })
            })
        ],
        controllers: [setup_controller_1.SetupController],
        providers: [payonCommandDispatcher_1.PayOnCommandDispatcher, setup_service_1.SetupService]
    })
], SetupModule);
exports.SetupModule = SetupModule;
//# sourceMappingURL=setup.module.js.map