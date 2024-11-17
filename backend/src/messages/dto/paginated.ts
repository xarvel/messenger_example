import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: T[];
  pageInfo: PageInfo;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor: string;
  @Field({ nullable: true })
  endCursor: string;
  @Field()
  hasNextPage: boolean;
  @Field()
  hasPreviousPage: boolean;
}

export function Edge<T>(classRef: Type<T>): Type<IEdgeType<T>> {
  @ObjectType(`${classRef.name}Edge`, {})
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  return EdgeType as Type<IEdgeType<T>>;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    edges: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
