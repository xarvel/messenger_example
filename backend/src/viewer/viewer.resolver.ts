import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Context } from '@nestjs/graphql';

import { Viewer } from './dto/viewer';
import { AuthGuard } from '../auth/auth.guard';

@Resolver((of) => Viewer)
export class ViewerResolver {
  @UseGuards(new AuthGuard())
  @Query((returns) => Viewer)
  async viewer(@Context() context: any): Promise<Viewer> {
    const { user } = context;

    return {
      currentUserID: context.user.id,
    };
  }
}
