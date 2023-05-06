import { ArgsType, Field } from '@nestjs/graphql';
import { CardInput } from '../inputs/card';

@ArgsType()
export class GetCardsArgs {
  @Field()
  filters: CardInput;
}
