import { MessagingColorsMapper } from './messaging-colors-mapper';
import { NewCardFace } from '../types/new-set';
import { Face } from '~/app/entities/face';

export class MessagingFaceMapper {
  static toDomain(newCardFace: NewCardFace) {
    return new Face({
      id: newCardFace.id,
      setId: newCardFace.setId,
      imageUri: newCardFace.imageUri,
      faceOfId: newCardFace.faceOfId,
      name: newCardFace.name,
      cmc: Number(newCardFace.cmc),
      language: newCardFace.language,
      manaCost: newCardFace.manaCost,
      effectText: newCardFace.effectText,
      flavorText: newCardFace.flavorText,
      typeLine: newCardFace.typeLine,
      colors: MessagingColorsMapper.toDomain(newCardFace.colors),
    });
  }
}
