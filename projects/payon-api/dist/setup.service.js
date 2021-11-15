"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let SetupService = class SetupService {
    created(request) {
        if (request.payload.channels.some(c => c.name.includes("AMEX"))) {
            throw new Error("There was an error setting up AMEX");
        }
        const responsePayload = Object.assign(request.payload, {});
        responsePayload.channels = this.createChannels(request.payload.channels);
        return { correlationId: request.correlationId, configurationId: uuid_1.v4(), payload: request.payload };
    }
    disable(request) {
        console.log(`SetupService.disable`, request);
        return { correlationId: request.correlationId, configurationId: uuid_1.v4(), payload: request.payload };
    }
    addChannels(request) {
        console.log(`SetupService.addChannels`, request);
        const channels = this.createChannels(request.payload);
        return { correlationId: request.correlationId, configurationId: uuid_1.v4(), payload: channels };
    }
    createChannels(channels) {
        return channels.map(c => { c.entityId = uuid_1.v4(); return c; });
    }
    disableChannels(request) {
        console.log(`SetupService.disableChannels`, request);
        return { correlationId: request.correlationId, configurationId: uuid_1.v4(), payload: null };
    }
};
SetupService = __decorate([
    common_1.Injectable()
], SetupService);
exports.SetupService = SetupService;
class SetupServiceRequest {
}
exports.SetupServiceRequest = SetupServiceRequest;
class SetupServiceResponse {
}
exports.SetupServiceResponse = SetupServiceResponse;
//# sourceMappingURL=setup.service.js.map