import { RabbitMQModule } from "@nestjs-plus/rabbitmq";
import { Module } from "@nestjs/common";
import { SetupController } from "./setup.controller";
import { AcehubCommandDispatcher } from "./saga/acehubCommandDispatcher";
import { SetupService } from "./setup.service";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      {
        useFactory: () => ({ uri: process.env.RABBIT_URL })
      })
  ],
  controllers: [SetupController],
  providers: [AcehubCommandDispatcher, SetupService]
})
export class SetupModule { }
