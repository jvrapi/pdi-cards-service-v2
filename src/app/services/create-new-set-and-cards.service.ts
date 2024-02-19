import { SetsRepository } from '~/app/repositories/sets-repository';
import { Injectable, Logger } from '@nestjs/common';
import { CardsRepository } from '~/app/repositories/cards.repository';

@Injectable()
export class CreateNewSetAndCardsService {
  private logger = new Logger(CreateNewSetAndCardsService.name);

  constructor(
    private readonly setsRepository: SetsRepository,
    private readonly cardsRepository: CardsRepository,
  ) {}

  async execute(data: NewSetProps) {
    try {
      const setId = `${data.code}-${data.id}`;

      this.logger.debug(`Processing set ${setId}`);

      const setAlreadyExists = await this.setsRepository.getById(data.id);
      if (setAlreadyExists) {
        this.logger.warn(`Set already exists`);
        return;
      }
      this.logger.debug(
        `Creating set ${setId} and ${data.cards.length} new cards`,
      );

      const cards: CreateSetCardsParams[] = [];

      data.cards.forEach((card) => {
        const cardData = {
          borderColor: card.borderColor,
          cmc: card.cmc ?? 0,
          collectionId: card.collectionId,
          effectText: card.effectText,
          flavorText: card.flavorText,
          frame: card.frame,
          id: card.id,
          imageUri: card.imageUri,
          isFoundInBooster: card.isFoundInBooster,
          isReprint: card.isReprint,
          isReserved: card.isReserved,
          isStorySpotlight: card.isStorySpotlight,
          isVariant: card.isVariant,
          language: card.language,
          layout: card.layout,
          loyalty: card.loyalty,
          manaCost: card.manaCost,
          name: card.name,
          rarity: card.rarity,
          securityStamp: card.securityStamp,
          setId: card.setId,
          typeLine: card.typeLine,
          faces: [],
        };

        if (card.faces.length) {
          card.faces.forEach((face) => {
            cards.push({
              borderColor: card.borderColor,
              cmc: face.cmc ?? 0,
              collectionId: card.collectionId,
              effectText: face.effectText,
              flavorText: face.flavorText,
              frame: card.frame,
              id: face.id,
              imageUri: face.imageUri,
              isFoundInBooster: card.isFoundInBooster,
              isReprint: card.isReprint,
              isReserved: card.isReserved,
              isStorySpotlight: card.isStorySpotlight,
              isVariant: card.isVariant,
              language: face.language,
              layout: card.layout,
              loyalty: card.loyalty,
              manaCost: face.manaCost,
              name: face.name,
              securityStamp: card.securityStamp,
              setId: face.setId,
              typeLine: face.typeLine,
            });

            cardData.faces.push({
              cardId: face.faceOfId,
              faceId: face.id,
            });
          });
        }

        cards.push(cardData);
      });

      await this.setsRepository.create({
        ...data,
        cards,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
