import { CreateCardParams } from './card';
import { CreateCardColorsParams } from './card-color';
import { CreateCardFaceParams } from './card-face';
import { CreateCardFormatParams } from './card-format';
import { CreateCardRarityParams } from './card-rarity';
import { CreateCardVersionParams } from './card-version';

export interface SetProps {
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

export type CreateSetCardsParams = CreateCardParams & {
  faces?: CreateCardFaceParams[];
  cardVersions: CreateCardVersionParams[];
  cardFormats: CreateCardFormatParams[];
  cardColors: CreateCardColorsParams[];
  cardRarity: CreateCardRarityParams;
};

export type CreateSetParams = Omit<SetProps, 'createdAt' | 'updatedAt'> & {
  cards: CreateSetCardsParams[];
};
