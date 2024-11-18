import { ArgsType, Field, Int, ID } from '@nestjs/graphql';

@ArgsType()
export class MessagesArgs {
  @Field((type) => Int, { nullable: true })
  last: number;

  @Field((type) => String, { nullable: true })
  before: string;

  @Field((type) => Int, { nullable: true })
  first: number;

  @Field((type) => String, { nullable: true })
  after: string;

  @Field((type) => ID)
  chatID: string;
}
