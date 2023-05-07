import { Injectable, Logger } from '@nestjs/common';
import { SetsRepository } from '~/infra/database/repositories/sets-repository';
import { NewSet } from '../types/new-set';
import { MessagingSetMapper } from '../mappers/messaging-set-mapper';

@Injectable()
export class CreateNewSetAndCardsService {
  private logger = new Logger(CreateNewSetAndCardsService.name);
  constructor(private readonly setsRepository: SetsRepository) {}

  async execute(newSet: NewSet) {
    try {
      const setAlreadyExists = await this.setsRepository.getById(newSet.id);
      if (setAlreadyExists) {
        this.logger.warn(
          `O set ${newSet.code} não foi criado pois ele já está cadastrado no banco de dados`,
        );
        return;
      }
      const set = MessagingSetMapper.toDomain(newSet);
      this.logger.log(
        `Inserindo a coleção ${set.code} e ${set.cards.length} novas cartas`,
      );
      await this.setsRepository.createSetAndCards(set);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
