import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GetAllSetsService } from '~/services/get-all-sets.service';
import { MessageController } from '~/app/controllers/message.controller';
import { CreateNewSetAndCardsService } from '~/services/create-new-set-and-cards.service';

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
