import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { ChatsService } from '../chats/chats.service';

@Module({
  providers: [ChatsService, MessagesResolver, MessagesService, DateScalar],
})
export class MessagesModule {}
