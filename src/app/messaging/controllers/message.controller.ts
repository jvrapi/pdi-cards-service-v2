import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllSetsService } from '../services/get-all-sets.service';
import { NewSet } from '../types/new-set';
import { CreateNewSetAndCardsService } from '../services/create-new-set-and-cards.service';

@Controller()
export class MessageController {
  constructor(
    @Inject('UpdaterService')
    private readonly updaterService: ClientProxy,
    private readonly getAllSetsService: GetAllSetsService,
    private readonly createNewSetAndCards: CreateNewSetAndCardsService,
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
    await this.createNewSetAndCards.execute(data);
  }
}
