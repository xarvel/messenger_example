import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Chat {
  @Field((type) => ID)
  id: string;

  @Field((type) => [User])
  participants: User[];
}
