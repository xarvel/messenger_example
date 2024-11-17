import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Viewer {
  @Field((type) => String)
  currentUserID: string;
}
