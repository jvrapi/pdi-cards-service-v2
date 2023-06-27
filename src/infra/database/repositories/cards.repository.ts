import { Card } from '~/app/entities/card';
import { Face } from '~/app/entities/face';

export interface FindByFiltersProps {
  take?: number;
  skip?: number;
  name?: string;
  type?: string;
  ids?: string[];
}

export abstract class CardsRepository {
  abstract findByFilters(data: FindByFiltersProps): Promise<Card[]>;
  abstract createCards(cards: Card[]): Promise<void>;
  abstract createFaces(faces: Face[]): Promise<void>;
}
