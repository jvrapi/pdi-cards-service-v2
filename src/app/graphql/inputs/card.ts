import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CardInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  id?: string;

  @Field(() => Int)
  take: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
