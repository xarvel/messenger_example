import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(type => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  creationDate: Date;

  @Field()
  senderID: string
}
