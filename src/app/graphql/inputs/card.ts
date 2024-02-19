import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CardInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
