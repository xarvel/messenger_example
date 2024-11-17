import { ForbiddenException } from '@nestjs/common';
import { Query, Resolver, Context } from '@nestjs/graphql';

import { Viewer } from './dto/viewer';

@Resolver((of) => Viewer)
export class ViewerResolver {
  @Query((returns) => Viewer)
  async viewer(@Context() context: any): Promise<Viewer> {
    if (!context.user) {
      throw new ForbiddenException();
    }

    return {
      id: context.user.id,
    };
  }
}
