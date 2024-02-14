import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageController } from '~/app/controllers/message.controller';
import { CreateNewSetAndCardsService } from '~/app/services/create-new-set-and-cards.service';
import { GetAllSetsService } from '~/app/services/get-all-sets.service';

@Module({
  imports: [
    DatabaseModule,
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
  providers: [GetAllSetsService, CreateNewSetAndCardsService],
})
export class MessagingModule {}
