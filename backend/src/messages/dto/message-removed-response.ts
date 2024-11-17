import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class MessageRemovedResponse {
    @Field((type) => [ID])
    messageIDs: string[];
}
