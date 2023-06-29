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

  static toPrisma(face: Face) {
    return {
      id: face.id,
      imageUri: face.imageUri,
      colors: PrismaColorsMapper.toPrisma(face.colors),
      formats: '',
      versions: '',
      language: face.language,
      name: face.name,
      cmc: face.cmc,
      effectText: face.effectText,
      flavorText: face.flavorText,
      manaCost: face.manaCost,
      typeLine: face.typeLine,
      setId: face.setId,
      faceOfId: face.faceOfId,
    };
  }
}
