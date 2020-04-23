import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: () => ({ uri: process.env.RABBIT_URL }),
    }),
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
