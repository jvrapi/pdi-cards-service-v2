import { randomUUID } from 'node:crypto';
import { Color } from './color';
import { Format } from './format';
import { Set } from './set';
import { Version } from './version';
import { Face } from './face';

export interface CardProps {
  id?: string;
  setId: string;
  imageUri?: string;
  faceOfId: string | null;
  name: string;
  language: string;
  layout: string | null;
  cmc: number | null;
  typeLine: string | null;
  collectionId: string | null;
  frame: string | null;
  borderColor: string | null;
  manaCost: string | null;
  loyalty: string | null;
  securityStamp: string | null;
  effectText: string | null;
  flavorText: string | null;
  rarity: string | null;
  isReserved: boolean | null;
  isReprint: boolean | null;
  isVariant: boolean | null;
  isFoundInBooster: boolean | null;
  isStorySpotlight: boolean | null;
  colors: Color[];
  formats: Format[];
  versions: Version[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Card {
  private readonly props: CardProps;

  private _faces: Face[] = [];

  private _set: Set;

  constructor(props: CardProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public get setId() {
    return this.props.setId;
  }

  public get name() {
    return this.props.name;
  }

  public get language() {
    return this.props.language;
  }

  public get layout() {
    return this.props.layout;
  }

  public get manaCost(): string | null {
    return this.props.manaCost;
  }

  public get cmc() {
    return this.props.cmc;
  }

  public get typeLine() {
    return this.props.typeLine;
  }

  public get loyalty() {
    return this.props.loyalty;
  }

  public get collectionId() {
    return this.props.collectionId;
  }

  public get frame() {
    return this.props.frame;
  }

  public get securityStamp() {
    return this.props.securityStamp;
  }

  public get borderColor() {
    return this.props.borderColor;
  }

  public get effectText() {
    return this.props.effectText;
  }

  public get flavorText() {
    return this.props.flavorText;
  }

  public get rarity() {
    return this.props.rarity;
  }

  public get isReserved() {
    return this.props.isReserved;
  }

  public get isReprint() {
    return this.props.isReprint;
  }

  public get isVariant() {
    return this.props.isVariant;
  }

  public get isFoundInBooster() {
    return this.props.isFoundInBooster;
  }

  public get isStorySpotlight() {
    return this.props.isStorySpotlight;
  }

  public get colors() {
    return this.props.colors;
  }

  public get versions() {
    return this.props.versions;
  }

  public get formats() {
    return this.props.formats;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get faceOfId() {
    return this.props.faceOfId;
  }

  public get faces() {
    return this._faces;
  }

  public set faces(faces: Face[]) {
    this._faces = faces;
  }

  public get imageUri() {
    return this.props.imageUri;
  }

  public get set() {
    return this._set;
  }

  public set set(set: Set) {
    this._set = set;
  }
}
