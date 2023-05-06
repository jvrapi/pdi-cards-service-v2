import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
