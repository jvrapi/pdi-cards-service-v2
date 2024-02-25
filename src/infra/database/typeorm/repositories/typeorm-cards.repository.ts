import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Card } from '~/app/entities/card';
import {
  CardsRepository,
  FindByFiltersProps,
} from '~/app/repositories/cards.repository';
import { Card as CardEntity } from '../entities/card.entity';
import { CardsMapper } from '../mappers/cards-mapper';
export class TypeOrmCardsRepository implements CardsRepository {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}
  async findByFilters(data: FindByFiltersProps): Promise<Card[]> {
    const where = {
      ...(data.name && { name: Like(`%${data.name}%`) }),
      ...(data.type && { type: Like(`%${data.type}%`) }),
      ...(data.ids?.length > 0 && { id: In(data.ids) }),
    };

    const cards = await this.cardRepository.find({
      where,
      take: data.take,
      skip: data.skip,
      relations: ['set', 'faces'],
    });

    return cards.map(CardsMapper.toDomain);
  }
}
