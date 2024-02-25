import { Card } from '~/app/entities/card';
import { FindByFiltersProps } from '~/types/card';

export abstract class CardsRepository {
  abstract findByFilters(data: FindByFiltersProps): Promise<Card[]>;
}
