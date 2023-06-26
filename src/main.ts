import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_CARDS_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });
  const PORT = process.env.APP_PORT || 4000;
  await app.startAllMicroservices();
  await app.listen(PORT);

  new Logger().log(`Cards service server is running on port ${PORT} 🔥`);
}
bootstrap();
