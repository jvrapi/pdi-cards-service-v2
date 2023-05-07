import { type Card as RawCard, type Set as RawSet } from '@prisma/client';

import { Set } from '~/app/entities/set';

type RawResponse = RawSet & {
  cards?: (RawCard & {
    faces: RawCard[];
  })[];
};
export class PrismaSetsMapper {
  static toDomain(raw: RawResponse): Set {
    const set = new Set({
      id: raw.id,
      code: raw.code,
      name: raw.name,
      type: raw.type,
      releasedAt: raw.releasedAt,
      isDigital: raw.isDigital,
      isFoilOnly: raw.isFoilOnly,
      iconUri: raw.iconUri,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return set;
  }

  static toPrisma(set: Set) {
    return {
      id: set.id,
      code: set.code,
      name: set.name,
      type: set.type,
      releasedAt: set.releasedAt,
      isDigital: set.isDigital,
      isFoilOnly: set.isFoilOnly,
    };
  }
}
