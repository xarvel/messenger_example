import { Field, ObjectType } from '@nestjs/graphql';
import { MessageEdge } from "./message-connection";

@ObjectType()
export class SendMessageResponse {
  @Field((type) => MessageEdge)
  messageEdge: MessageEdge
}
