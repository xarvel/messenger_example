import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { ChatsService } from '../chats/chats.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [
    UsersService,
    ChatsService,
    MessagesResolver,
    MessagesService,
    DateScalar,
  ],
})
export class MessagesModule {}
