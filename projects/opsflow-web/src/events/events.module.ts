import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AppService } from '../app.service';

@Module({
  providers: [EventsGateway, AppService],
})
export class EventsModule {}