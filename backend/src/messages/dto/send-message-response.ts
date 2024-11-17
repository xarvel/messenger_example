import { Field, ObjectType } from '@nestjs/graphql';
import { MessageEdge } from "./paginated-message";

@ObjectType()
export class SendMessageResponse {
  @Field((type) => MessageEdge)
  messageEdge: MessageEdge
}
