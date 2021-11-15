import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { EventsGateway } from "./events/events.gateway";
import { AppService } from "./app.service";
import { RabbitMQModule } from "@nestjs-plus/rabbitmq";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      {
        useFactory: () => ({ uri: process.env.RABBIT_URL })
      }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client/dist"),
    })
  ],
  controllers: [AppController],
  providers: [EventsGateway, AppService],
})
export class AppModule { }