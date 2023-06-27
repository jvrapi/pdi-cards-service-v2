import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SetsRepository } from '~/infra/database/repositories/sets-repository';
import { Logger } from '@nestjs/common';
import { MessagingSetMapper } from '~/app/messaging/mappers/messaging-set-mapper';
import { NewSet } from '~/app/messaging/types/new-set';
import { CardsRepository } from '~/infra/database/repositories/cards.repository';
import { Face } from '~/app/entities/face';

@Processor('create-new-set-and-cards')
export class CreateNewSetAndCardsQueueConsumer {
  private logger = new Logger(CreateNewSetAndCardsQueueConsumer.name);

  constructor(
    private readonly setsRepository: SetsRepository,
    private cardsRepository: CardsRepository,
  ) {}

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

        const faces = newSet.cards.reduce<Face[]>(
          (acc, curr) => acc.concat(curr.faces),
          [],
        );

        await this.setsRepository.create(newSet);
        await this.cardsRepository.createCards(newSet.cards);
        await this.cardsRepository.createFaces(faces);
      } catch (error) {
        this.logger.error(`Erro ao tentar criar o set ${set.cards}`, error);
      }
    } else {
      this.logger.warn(
        `O coleção ${set.code} não foi criada pois não possui cartas`,
      );
    }
  }
}
