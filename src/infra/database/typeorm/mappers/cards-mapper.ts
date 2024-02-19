import { ColorsMapper } from './colors-mapper';
import { FormatsMapper } from './formats-mapper';
import { SetsMapper } from './sets-mapper';
import { VersionsMapper } from './versions-mapper';
import { Card } from '~/app/entities/card';
import { FaceMapper } from './face-mapper';

import { Card as RawResponse } from '../entities/card.entity';

export class CardsMapper {
  static toDomain(raw: RawResponse): Card {
    const card = new Card({
      id: raw.id,
      setId: raw.setId,
      name: raw.name,
      faceOfId: raw.faceOfId,
      rarity: raw.rarity,
      cmc: Number(raw.cmc),
      imageUri: raw.imageUri,
      borderColor: raw.borderColor,
      collectionId: raw.collectionId,
      frame: raw.frame,
      isFoundInBooster: raw.isFoundInBooster,
      language: raw.language,
      isReserved: raw.isReserved,
      isStorySpotlight: raw.isStorySpotlight,
      isVariant: raw.isVariant,
      layout: raw.layout,
      loyalty: raw.loyalty,
      manaCost: raw.manaCost,
      securityStamp: raw.securityStamp,
      effectText: raw.effectText,
      flavorText: raw.flavorText,
      typeLine: raw.typeLine,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isReprint: raw.isReprint,
      colors: ColorsMapper.toDomain(raw.colors),
      formats: FormatsMapper.toDomain(raw.formats),
      versions: VersionsMapper.toDomain(raw.versions),
    });

    if (raw.faces.length) {
      card.faces = raw.faces.map(FaceMapper.toDomain);
    }

    if (raw.set) {
      card.set = SetsMapper.toDomain(raw.set);
    }

    return card;
  }
}
