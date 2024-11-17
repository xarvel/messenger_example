import { ArgsType, Field, Int, ID } from '@nestjs/graphql';

@ArgsType()
export class MessagesArgs {
  @Field((type) => Int)
  last = 0;

  @Field((type) => String, { nullable: true })
  before: string;

  @Field((type) => ID)
  chatID: string;
}
