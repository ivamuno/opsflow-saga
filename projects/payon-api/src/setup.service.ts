import { Injectable } from "@nestjs/common";
import * as Model from "./model/payon.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SetupService {
	created(request: SetupServiceRequest<Model.Merchant>): SetupServiceResponse<Model.Merchant> {
		if (request.payload.channels.some(c => c.name.includes("AMEX"))) {
			throw new Error("There was an error setting up AMEX");
		}

		const responsePayload: Model.Merchant = Object.assign(request.payload, {});
		responsePayload.channels = this.createChannels(request.payload.channels);
		return { correlationId: request.correlationId, configurationId: uuidv4(), payload: request.payload };
	}

	disable(request: SetupServiceRequest<string>): SetupServiceResponse<string> {
		console.log(`SetupService.disable`, request);
		return { correlationId: request.correlationId, configurationId: uuidv4(), payload: request.payload };
	}

	addChannels(request: SetupServiceRequest<Model.Channel[]>): SetupServiceResponse<Model.Channel[]> {
		console.log(`SetupService.addChannels`, request);
		const channels = this.createChannels(request.payload);
		return { correlationId: request.correlationId, configurationId: uuidv4(), payload: channels };
	}

	private createChannels(channels: Model.Channel[]): Model.Channel[] {
		return channels.map(c => { c.entityId = uuidv4(); return c; });
	}

	disableChannels(request: SetupServiceRequest<string>): SetupServiceResponse<number> {
		console.log(`SetupService.disableChannels`, request);
		return { correlationId: request.correlationId, configurationId: uuidv4(), payload: null };
	}
}

export class SetupServiceRequest<T> {
	correlationId: string;
	payload: T;
}

export class SetupServiceResponse<T> {
	correlationId: string;
	configurationId: string;
	payload: T;
}