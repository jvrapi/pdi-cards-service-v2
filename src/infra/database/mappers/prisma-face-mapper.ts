import { Card as Raw } from '@prisma/client';
import { PrismaColorsMapper } from './prisma-colors-mapper';
import { Face } from '~/app/entities/face';

export class PrismaFaceMapper {
  static toDomain(raw: Raw) {
    return new Face({
      id: raw.id,
      setId: raw.setId,
      imageUri: raw.imageUri,
      faceOfId: raw.id,
      name: raw.name,
      cmc: Number(raw.cmc),
      language: raw.language,
      manaCost: raw.manaCost,
      effectText: raw.effectText,
      flavorText: raw.flavorText,
      typeLine: raw.typeLine,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      colors: PrismaColorsMapper.toDomain(raw.colors),
    });
  }
}
