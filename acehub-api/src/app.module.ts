import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConsumer } from './app.consumer';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({ useFactory: () => ({ uri: process.env.RABBIT_URL }) })
  ],
  controllers: [AppController],
  providers: [AppService, AppConsumer],
})
export class AppModule { }
