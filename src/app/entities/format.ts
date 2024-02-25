import { FormatProps } from '~/types/format';

export class Format implements FormatProps {
  private readonly props: FormatProps;

  constructor(props: FormatProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
