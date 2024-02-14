import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import newRelic from 'newrelic';

import { NewSet } from '../messaging/types/new-set';
import { MessagingSetMapper } from '../messaging/mappers/messaging-set-mapper';
import { CreateNewSetAndCardsService } from '../services/create-new-set-and-cards.service';
import { GetAllSetsService } from '../services/get-all-sets.service';

@Controller()
export class MessageController {
  private logger = new Logger(MessageController.name);
  constructor(
    @Inject('UpdaterService')
    private readonly updaterService: ClientProxy,
    private readonly createNewSetAndCardsService: CreateNewSetAndCardsService,
    private readonly getAllSetsService: GetAllSetsService,
  ) {}

  @MessagePattern('get-all-sets')
  async getAllSets() {
    this.logger.debug('Received message to get all sets');
    newRelic.setTransactionName('get-all-sets');
    const sets = await this.getAllSetsService.execute();
    const setsCodes = sets.map((set) => set.code);
    await this.updaterService.connect();
    this.logger.debug('Sending all sets codes');

    this.updaterService.emit('all-sets-codes', setsCodes);
  }

  @MessagePattern('new-set')
  async newSet(@Payload() data: NewSet) {
    newRelic.setTransactionName(`new-set: ${data.code}-${data.id}`);
    await this.createNewSetAndCardsService.execute(
      MessagingSetMapper.toDomain(data),
    );
  }
}
