declare global {
  interface CardFaceProps {
    cardId: string;
    faceId: string;
    createdAt: Date;
    updatedAt: Date;
  }

  type CreateCardFaceParams = Omit<CardFaceProps, 'createdAt' | 'updatedAt'>;
}
export {};
