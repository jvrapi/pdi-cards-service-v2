import { Injectable } from '@nestjs/common';
import { CardsRepository } from '~/app/repositories/cards.repository';

interface GetCardsFilers {
  take?: number;
  skip?: number;
  name?: string;
  type?: string;
  ids?: string[];
}

@Injectable()
export class GetCardsService {
  constructor(private cardsRepository: CardsRepository) {}
  async execute(filters: GetCardsFilers) {
    try {
      if (!filters.ids?.length && !filters.take) {
        throw new Error('Filtros não encontrados');
      }
      const cards = await this.cardsRepository.findByFilters(filters);
      return cards;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao tentar buscar as cartas');
    }
  }
}
