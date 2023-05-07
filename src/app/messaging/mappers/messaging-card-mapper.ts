import { Card } from '~/app/entities/card';
import { NewCard } from '../types/new-set';
import { MessagingColorsMapper } from './messaging-colors-mapper';
import { MessagingFormatsMapper } from './messaging-formats-mapper';
import { MessagingVersionsMapper } from './messaging-versions-mapper';
import { MessagingFaceMapper } from './messaging-face-mapper';

export class MessagingCardMapper {
  static toDomain(newCard: NewCard) {
    const card = new Card({
      id: newCard.id,
      faceOfId: null,
      imageUri: newCard.imageUri,
      name: newCard.name,
      language: newCard.language,
      layout: newCard.layout,
      cmc: newCard.cmc,
      typeLine: newCard.typeLine,
      collectionId: newCard.collectionId,
      frame: newCard.frame,
      borderColor: newCard.borderColor,
      manaCost: newCard.manaCost,
      loyalty: newCard.loyalty,
      securityStamp: newCard.securityStamp,
      effectText: newCard.effectText,
      flavorText: newCard.flavorText,
      rarity: newCard.rarity,
      isReserved: newCard.isReserved,
      isReprint: newCard.isReprint,
      isVariant: newCard.isVariant,
      isFoundInBooster: newCard.isFoundInBooster,
      isStorySpotlight: newCard.isStorySpotlight,
      colors: MessagingColorsMapper.toDomain(newCard.colors),
      formats: MessagingFormatsMapper.toDomain(newCard.formats),
      versions: MessagingVersionsMapper.toDomain(newCard.versions),
    });

    if (newCard.faces.length) {
      card.faces = newCard.faces.map(MessagingFaceMapper.toDomain);
    }

    return card;
  }
}
