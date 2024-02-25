export interface CardColorProps {
  cardId: string;
  colorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCardColorsParams = Pick<CardColorProps, 'cardId' | 'colorId'>;
