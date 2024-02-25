export interface CardRarityProps {
  cardId: string;
  rarityId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCardRarityParams = Pick<
  CardRarityProps,
  'cardId' | 'rarityId'
>;
