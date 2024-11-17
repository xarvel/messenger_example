import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class RemoveMessageResponse {
  @Field((type) => ID)
  messageID: string;
}
