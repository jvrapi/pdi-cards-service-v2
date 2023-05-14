import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CreateNewSetAndCardsQueueConsumer } from '~/app/queues/create-new-set-and-cards/create-new-set-and-cards-queue-consumer.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
      },
      prefix: 'cards_service',
    }),
    BullModule.registerQueue({
      name: 'create-new-set-and-cards',
    }),
  ],
  providers: [CreateNewSetAndCardsQueueConsumer],
  exports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
      },
      prefix: 'cards_service',
    }),
    BullModule.registerQueue({
      name: 'create-new-set-and-cards',
    }),
  ],
})
export class QueueModule {}
