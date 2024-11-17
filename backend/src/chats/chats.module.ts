import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { UsersService } from '../users/users.service';

@Module({
  providers: [ChatsService, ChatsResolver, UsersService],
})
export class ChatsModule {}
