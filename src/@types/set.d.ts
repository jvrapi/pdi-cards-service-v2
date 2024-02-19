declare global {
  interface SetProps {
    id: string;
    iconUri: string;
    code: string;
    name: string;
    type: string;
    releasedAt: string;
    isDigital: boolean;
    isFoilOnly: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  type CreateSetCardsParams = CreateCardParams & {
    faces?: CreateCardFaceParams[];
  };

  type CreateSetParams = Omit<SetProps, 'createdAt' | 'updatedAt'> & {
    cards: CreateSetCardsParams[];
  };
}
export {};
