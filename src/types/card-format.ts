export interface CardFormatProps {
  cardId: string;
  formatId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCardFormatParams = Pick<
  CardFormatProps,
  'cardId' | 'formatId' | 'status'
>;
