import { Module } from '@nestjs/common';
import { MessageController } from '~/app/messaging/controllers/message.controller';
import { GetAllSetsService } from '~/app/messaging/services/get-all-sets.service';
import { DatabaseModule } from './database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueModule } from './queue.module';

@Module({
  imports: [
    DatabaseModule,
    QueueModule,
    ClientsModule.registerAsync([
      {
        name: 'UpdaterService',
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: process.env.RABBITMQ_UPDATER_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [GetAllSetsService],
})
export class MessagingModule {}
