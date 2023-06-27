import { Card as RawCard, Prisma, Set as RawSet } from '@prisma/client';
import { PrismaColorsMapper } from './prisma-colors-mapper';
import { PrismaFormatsMapper } from './prisma-formats-mapper';
import { PrismaSetsMapper } from './prisma-sets-mapper';
import { PrismaVersionsMapper } from './prisma-versions-mapper';
import { Card } from '~/app/entities/card';
import { PrismaFaceMapper } from './prisma-face-mapper';

type RawResponse = RawCard & {
  faces?: RawCard[];
  set: RawSet;
};

export class PrismaCardsMapper {
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
      colors: PrismaColorsMapper.toDomain(raw.colors),
      formats: PrismaFormatsMapper.toDomain(raw.formats),
      versions: PrismaVersionsMapper.toDomain(raw.versions),
    });

    if (raw.faces.length) {
      card.faces = raw.faces.map(PrismaFaceMapper.toDomain);
    }

    if (raw.set) {
      card.set = PrismaSetsMapper.toDomain(raw.set);
    }

    return card;
  }

  static toPrisma(card: Card) {
    return {
      id: card.id,
      imageUri: card.imageUri,
      colors: PrismaColorsMapper.toPrisma(card.colors),
      formats: PrismaFormatsMapper.toPrisma(card.formats),
      versions: PrismaVersionsMapper.toPrisma(card.versions),
      language: card.language,
      name: card.name,
      borderColor: card.borderColor,
      cmc: card.cmc !== null ? new Prisma.Decimal(card.cmc) : null,
      collectionId: card.collectionId,
      effectText: card.effectText,
      flavorText: card.flavorText,
      isFoundInBooster: card.isFoundInBooster,
      isReprint: card.isReprint,
      isReserved: card.isReprint,
      isVariant: card.isVariant,
      layout: card.layout,
      isStorySpotlight: card.isStorySpotlight,
      loyalty: card.loyalty,
      manaCost: card.manaCost,
      rarity: card.rarity,
      securityStamp: card.securityStamp,
      typeLine: card.typeLine,
      setId: card.setId,
    };
  }
}
