import { Injectable } from '@nestjs/common';
import { CardsRepository } from '~/infra/database/repositories/cards.repository';

interface GetCardsFilers {
  take: number;
  skip?: number;
  name?: string;
  type?: string;
  id?: string;
}

@Injectable()
export class GetCardsService {
  constructor(private cardsRepository: CardsRepository) {}
  execute(filters: GetCardsFilers) {
    try {
      return this.cardsRepository.findByFilters(filters);
    } catch (error) {
      throw new Error('Erro ao tentar buscar as cartas');
    }
  }
}
