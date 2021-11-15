import { NestFactory } from "@nestjs/core";
import { SetupModule } from "./setup.module";
import { INestApplication } from "@nestjs/common";

async function bootstrap(): Promise<any> {
  const app: INestApplication = await NestFactory.create(SetupModule);
  await app.listen(8080);
}

bootstrap();
