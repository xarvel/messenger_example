import { Edge, Paginated } from './paginated';
import { Message } from './message';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageEdge extends Edge(Message) {}

@ObjectType()
export class MessageConnection extends Paginated(MessageEdge) {}
