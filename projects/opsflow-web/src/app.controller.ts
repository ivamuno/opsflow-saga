import { Controller, Post, Body } from "@nestjs/common";
import { Merchant } from "./app.service";
import { EventsGateway } from "./events/events.gateway";

@Controller()
export class AppController {
  constructor(private readonly eventsGateway: EventsGateway) { }

  @Post("aceHub/config/")
  async setupAceHubMerchant(@Body() merchants: Merchant[]): Promise<void> {
    this.eventsGateway.emitAceHubSetupUpdate(merchants);
  }
}
