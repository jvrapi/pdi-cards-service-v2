import { Card } from '~/app/entities/card';
import {
  CardsRepository,
  FindByFiltersProps,
} from '../repositories/cards.repository';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper';

@Injectable()
export class PrismaCardsRepository implements CardsRepository {
  constructor(private prisma: PrismaService) {}

  async findByFilters(data: FindByFiltersProps): Promise<Card[]> {
    const { id, name, take, skip, type } = data;
    const cards = await this.prisma.card.findMany({
      where: {
        AND: {
          faceOfId: null,
          OR: {
            name: name && {
              contains: name,
            },
            typeLine: type && {
              contains: type,
            },
            id,
          },
        },
      },
      include: {
        set: true,
        faces: true,
      },
      take,
      skip,
    });

    return cards.map(PrismaCardsMapper.toDomain);
  }
}
