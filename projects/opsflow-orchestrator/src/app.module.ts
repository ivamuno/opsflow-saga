import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SagaInstanceDto, SagaInstanceRepository } from './sagas/sagainstance.repository';
import { createConnection, Connection } from 'typeorm';

const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [SagaInstanceDto],
      synchronize: false
    }),
  },
];

const sagaInstanceProviders = [
  {
    provide: 'SAGA_INSTANCE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SagaInstanceDto),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      {
        useFactory: () => ({ uri: process.env.RABBIT_URL })
      })
  ],
  controllers: [AppController],
  providers: [
    ...databaseProviders,
    ...sagaInstanceProviders,
    SagaInstanceRepository,
    AppService
  ],
})
export class AppModule { }
