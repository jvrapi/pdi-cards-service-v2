export interface CardVersionProps {
  cardId: string;
  versionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCardVersionParams = Pick<
  CardVersionProps,
  'cardId' | 'versionId'
>;
