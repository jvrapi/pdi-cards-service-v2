import { Field, ObjectType } from '@nestjs/graphql';
import { Face } from './face';
import { Set } from './set';

@ObjectType()
export class Card {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  rarity: string;

  @Field()
  type: string;

  @Field(() => [String])
  colors: string[];

  @Field(() => [String])
  formats: string[];

  @Field(() => [String])
  versions: string[];

  @Field({ nullable: true })
  imageUri?: string;

  @Field(() => Set)
  set: Set;

  @Field(() => [Face], { nullable: true })
  faces?: Face[];
}
