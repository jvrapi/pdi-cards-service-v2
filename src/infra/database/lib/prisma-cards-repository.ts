import { Card } from '~/app/entities/card';
import {
  CardsRepository,
  FindByFiltersProps,
} from '../../../app/repositories/cards.repository';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper';
import { Prisma } from '@prisma/client';
import { Face } from '~/app/entities/face';
import { PrismaFaceMapper } from '../mappers/prisma-face-mapper';

@Injectable()
export class PrismaCardsRepository implements CardsRepository {
  constructor(private prisma: PrismaService) {}

  async findByFilters(data: FindByFiltersProps): Promise<Card[]> {
    const { ids, name, take, skip, type } = data;
    const filtersBuilded: Prisma.CardWhereInput = {
      ...(name && { name: { contains: name } }),
      ...(type && { contains: type }),
      ...(ids?.length > 0 && { id: { in: ids } }),
    };
    const cards = await this.prisma.card.findMany({
      where: {
        AND: {
          faceOfId: null,
          OR: filtersBuilded,
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

  async createCards(cards: Card[]): Promise<void> {
    await this.prisma.card.createMany({
      data: cards.map(PrismaCardsMapper.toPrisma),
    });
  }

  async createFaces(faces: Face[]): Promise<void> {
    await this.prisma.card.createMany({
      data: faces.map(PrismaFaceMapper.toPrisma),
    });
  }
}
