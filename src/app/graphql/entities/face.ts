import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Face {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field(() => [String])
  colors: string[];

  @Field()
  imageUri: string;
}
