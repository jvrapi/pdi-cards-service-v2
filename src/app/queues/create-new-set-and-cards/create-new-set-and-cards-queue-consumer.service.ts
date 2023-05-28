import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SetsRepository } from '~/infra/database/repositories/sets-repository';
import { Logger } from '@nestjs/common';
import { MessagingSetMapper } from '~/app/messaging/mappers/messaging-set-mapper';
import { NewSet } from '~/app/messaging/types/new-set';

@Processor('create-new-set-and-cards')
export class CreateNewSetAndCardsQueueConsumer {
  private logger = new Logger(CreateNewSetAndCardsQueueConsumer.name);

  constructor(private readonly setsRepository: SetsRepository) {}

  @Process('create-new-set-and-cards-job')
  async createNewSetAndCardsJob(job: Job<NewSet>) {
    const { data: set } = job;
    if (set.cards.length) {
      const newSet = MessagingSetMapper.toDomain(set);
      try {
        const setAlreadyExists = await this.setsRepository.getById(newSet.id);
        if (setAlreadyExists) {
          this.logger.warn(
            `O set ${newSet.code} não foi criado pois ele já está cadastrado no banco de dados`,
          );
          return;
        }
        this.logger.log(
          `Inserindo a coleção ${newSet.code} e ${newSet.cards.length} novas cartas`,
        );
        await this.setsRepository.createSetAndCards(newSet);
      } catch (error) {
        this.logger.error(
          `Error when try create set ${set.code}. Error: ${error}`,
        );
      }
    } else {
      this.logger.warn(`Skipped creation of set ${set.code}. Set has no cards`);
    }
  }
}
