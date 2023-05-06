import { randomUUID } from 'node:crypto';

export interface SetProps {
  id?: string;
  iconUri?: string;
  code: string;
  name: string;
  type: string;
  releasedAt: string;
  isDigital: boolean;
  isFoilOnly: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Set {
  private readonly props: SetProps;

  constructor(props: SetProps) {
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

  public get code() {
    return this.props.code;
  }

  public set code(code: string) {
    this.props.code = code;
  }

  public get name() {
    return this.props.name;
  }

  public get type() {
    return this.props.type;
  }

  public get releasedAt() {
    return this.props.releasedAt;
  }

  public get isDigital() {
    return this.props.isDigital;
  }

  public get isFoilOnly() {
    return this.props.isFoilOnly;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get iconUri() {
    return this.props.iconUri;
  }
}
