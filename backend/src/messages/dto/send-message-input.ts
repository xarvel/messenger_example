import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field((type) => String)
  text: string;

  @Field((type) => ID)
  chatID: string;
}
