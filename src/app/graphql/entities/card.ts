import { Field, ObjectType } from '@nestjs/graphql';
import { Face } from './face';
import { Set } from './set';

@ObjectType()
export class Card {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  rarity: string;

  @Field(() => String)
  type: string;

  @Field(() => [String])
  colors: string[];

  @Field(() => [String])
  formats: string[];

  @Field(() => [String])
  versions: string[];

  @Field(() => String)
  imageUri: string;

  @Field(() => Set)
  set: Set;

  @Field(() => [Face], { nullable: true })
  faces?: Face[];
}
