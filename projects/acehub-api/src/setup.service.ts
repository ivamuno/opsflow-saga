import { Injectable } from "@nestjs/common";
import * as Model from "./model/acehub.model";

@Injectable()
export class SetupService {
	private static configId = 0;

	private nextConfigId(): string {
		return (SetupService.configId++).toString();
	}

	created(request: SetupServiceRequest<Model.Account>): SetupServiceResponse<Model.Account> {
		console.log(`SetupService.create`, request);
		if (request.payload.channels.some(c => Model.ChannelType[c.type] === "iDeal")) {
			throw new Error("There was an error setting up iDeal");
		}

		const responsePayload: Model.Account = Object.assign(request.payload, {});
		responsePayload.credentials = this.createCredentials([request.payload.merchantName]);
		responsePayload.channels = this.createChannels(request.payload.channels.map(c => c.type));
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: request.payload };
	}

	disable(request: SetupServiceRequest<string>): SetupServiceResponse<string> {
		console.log(`SetupService.disable`, request);
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: request.payload };
	}

	addCredentials(request: SetupServiceRequest<Model.Credentials[]>): SetupServiceResponse<Model.Credentials[]> {
		console.log(`SetupService.addCredentials`, request);
		const credentials: Model.Credentials[] = this.createCredentials(request.payload.map(p => p.user));
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: credentials };
	}

	private createCredentials(users: string[]): Model.Credentials[] {
		return users.map(u => { return { user: u, pass: `pass${u}` } as Model.Credentials; });
	}

	disableCredentials(request: SetupServiceRequest<string[]>): SetupServiceResponse<void> {
		console.log(`SetupService.disableCredentials`, request);
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: null };
	}

	addChannels(request: SetupServiceRequest<Model.Channel[]>): SetupServiceResponse<Model.Channel[]> {
		console.log(`SetupService.addChannels`, request);
		const channels: Model.Channel[] = this.createChannels(request.payload.map(p => p.type));
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: channels };
	}

	private createChannels(channels: Model.ChannelType[]): Model.Channel[] {
		return channels.map(c => { return { type: c, token: `token${Model.ChannelType[c]}` } as Model.Channel; });
	}

	disableChannels(request: SetupServiceRequest<string>): SetupServiceResponse<number> {
		console.log(`SetupService.disableChannels`, request);
		return { correlationId: request.correlationId, configurationId: this.nextConfigId(), payload: null };
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