import { Args, Context, Query, Resolver, ID } from '@nestjs/graphql';
import { Chat } from './dto/chat';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ChatsService } from './chats.service';
import { UsersService } from '../users/users.service';

@Resolver((of) => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(new AuthGuard())
  @Query((returns) => Chat)
  async chat(
    @Context() context: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Chat> {
    const { user } = context;

    const chat = await this.chatsService.findOneById(id);

    if (!chat) {
      throw new NotFoundException();
    }

    if (!chat.participants.includes(user.id)) {
      throw new NotFoundException();
    }

    const users = await Promise.all(
      chat.participants.map((userID) => this.usersService.findOneById(userID)),
    );

    return {
      id: chat.id,
      participants: users,
    };
  }
}
