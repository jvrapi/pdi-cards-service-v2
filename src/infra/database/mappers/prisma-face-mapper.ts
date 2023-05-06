import { Card as Raw } from '@prisma/client';
import { Card } from '~/app/entities/card';
import { PrismaVersionsMapper } from './prisma-versions-mapper';
import { PrismaFormatsMapper } from './prisma-formats-mapper';
import { PrismaColorsMapper } from './prisma-colors-mapper';

export class PrismaFaceMapper {
  static toDomain(raw: Raw) {
    return new Card({
      id: raw.id,
      imageUri: raw.imageUri,
      faceOfId: raw.id,
      name: raw.name,
      rarity: raw.rarity,
      cmc: Number(raw.cmc),
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
  }
}
