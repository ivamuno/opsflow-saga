import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { AppService, Merchant } from "../app.service";
import { RabbitSubscribe } from "@nestjs-plus/rabbitmq";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly appService: AppService
  ) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("AppGateway");

  @RabbitSubscribe({
    exchange: "SetupSaga-exchange-events",
    routingKey: "",
    queue: "SetupSaga-queue-events"
  })
  public async pubSubHandler(msg: {}): Promise<void> {
    const setupSagaData: SetupSagaData = msg as SetupSagaData;
    const merchant: Merchant = {
      businessId: setupSagaData.businessId,
      name: setupSagaData.merchantName,
      status: setupSagaData.trace.status,
      init: setupSagaData.trace.init,
      cards: setupSagaData.trace.cards,
      payon: setupSagaData.trace.payon,
      acehub: setupSagaData.trace.acehub,
      finish: setupSagaData.trace.finish
    };
    this.logger.log("pubSubHandler", JSON.stringify(msg));
    this.emitAceHubSetupUpdate([merchant]);
  }

  emitAceHubSetups(): void {
    this.server.emit("aceHubSetups", this.appService.getAceHubConfig());
  }

  emitAceHubSetupUpdate(merchants: Merchant[]): void {
    this.appService.setupAceHubMerchant(merchants);
    this.server.emit("aceHubSetupUpdate", JSON.stringify(merchants));
  }

  afterInit(server: Server): any {
    this.logger.log("Init");
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.emitAceHubSetups();
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}

class SetupSagaData {
  public constructor(
    readonly correlationId: string,
    readonly timestamp: Date,
    readonly businessId: string,
    readonly merchantName: string,
    readonly paymentMethods: string[],
    readonly trace: SetupSagaDataTrace
  ) { }
}

class SetupSagaDataTrace {
  status: string;
  init: SetupSagaDataTraceStep;
  cards: SetupSagaDataTraceStep;
  payon: SetupSagaDataTraceStep;
  acehub: SetupSagaDataTraceStep;
  finish: SetupSagaDataTraceStep;
}

class SetupSagaDataTraceStep {
  command: string;
  compensation?: string;
}