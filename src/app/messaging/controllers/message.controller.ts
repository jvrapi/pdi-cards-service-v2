import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllSetsService } from '../services/get-all-sets.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NewSet } from '../types/new-set';
import { MessagingSetMapper } from '../mappers/messaging-set-mapper';

@Controller()
export class MessageController {
  constructor(
    @Inject('UpdaterService')
    private readonly updaterService: ClientProxy,
    @InjectQueue('create-new-set-and-cards')
    private readonly createNewSetAndCardsQueue: Queue,
    private readonly getAllSetsService: GetAllSetsService,
  ) {}

  @MessagePattern('get-all-sets')
  async getAllSets() {
    const sets = await this.getAllSetsService.execute();
    const setsCodes = sets.map((set) => set.code);
    await this.updaterService.connect();
    this.updaterService.emit('all-sets-codes', setsCodes);
  }

  @MessagePattern('new-set')
  async newSet(@Payload() data: NewSet) {
    this.createNewSetAndCardsQueue.add('create-new-set-and-cards-job', data, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
