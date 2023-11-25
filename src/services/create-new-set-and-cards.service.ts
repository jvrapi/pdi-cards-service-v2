import { SetsRepository } from '~/infra/database/repositories/sets-repository';
import { Injectable, Logger } from '@nestjs/common';
import { CardsRepository } from '~/infra/database/repositories/cards.repository';
import { Face } from '~/app/entities/face';
import { Set } from '~/app/entities/set';

@Injectable()
export class CreateNewSetAndCardsService {
  private logger = new Logger(CreateNewSetAndCardsService.name);

  constructor(
    private readonly setsRepository: SetsRepository,
    private cardsRepository: CardsRepository,
  ) {}

  async execute(set: Set) {
    if (set.cards.length) {
      try {
        const setAlreadyExists = await this.setsRepository.getById(set.id);
        if (setAlreadyExists) {
          this.logger.warn(
            `O set ${set.code} não foi criado pois ele já está cadastrado no banco de dados`,
          );
          return;
        }

        this.logger.log(
          `Inserindo a coleção ${set.code} e ${set.cards.length} novas cartas`,
        );

        const faces = set.cards.reduce<Face[]>(
          (acc, curr) => acc.concat(curr.faces),
          [],
        );

        await this.setsRepository.create(set);
        await this.cardsRepository.createCards(set.cards);
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
