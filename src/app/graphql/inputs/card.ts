import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CardInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  take?: number;

  @Field({ nullable: true })
  skip?: number;
}
