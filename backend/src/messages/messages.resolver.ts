import { ForbiddenException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
  ID,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { SendMessageInput } from './dto/send-message-input';
import { MessagesArgs } from './dto/messages.args';
import { Message } from './models/message.model';
import { encode, MessagesService } from './messages.service';
import { MessageEdge, PaginatedMessage } from './dto/paginated-message';
import { ChatsService } from '../chats/chats.service';
import { SendMessageResponse } from './dto/send-message-response';
import { UsersService } from '../users/users.service';
import { RemoveMessageResponse } from './dto/remove-message-response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

const pubSub = new PubSub();

const filterRecipient = (payload, variables, context) => {
  return (
    (context?.req?.extra?.user.id === payload.userID ||
      context?.user?.id === payload.userID) &&
    variables.chatID === payload.chatID
  );
};

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(new AuthGuard())
  @Query((returns) => PaginatedMessage)
  async messages(
    @Context() context: any,
    @Args() messagesArgs: MessagesArgs,
  ): Promise<PaginatedMessage> {
    if (!context.user) {
      throw new ForbiddenException();
    }

    const chat = await this.chatsService.findOneById(messagesArgs.chatID);

    if (!chat) {
      throw new ForbiddenException();
    }

    const users = await Promise.all(
      chat.participants.map((id) => this.usersService.findOneById(id)),
    );

    const userNamesMap = users.reduce((acc, currentValue) => {
      acc[currentValue.id] = currentValue.name;
      return acc;
    }, {});

    const messages = await this.messagesService.findAll(messagesArgs);

    const edges = messages.map((message) => {
      const messageNode: Message = {
        senderName: userNamesMap[message.senderID],
        id: message.id,
        creationDate: message.creationDate,
        text: message.text,
        senderID: message.senderID,
      };

      return {
        cursor: encode(message.creationDate.toISOString()),
        node: messageNode,
      };
    });

    return {
      edges,
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: '',
        endCursor: '',
      },
    };
  }

  @UseGuards(new AuthGuard())
  @Mutation((returns) => SendMessageResponse)
  async sendMessage(
    @Context() context: any,
    @Args('input') input: SendMessageInput,
  ): Promise<SendMessageResponse> {
    const { user } = context;
    if (!user) {
      throw new ForbiddenException();
    }

    const chat = await this.chatsService.findOneById(input.chatID);

    if (!chat) {
      throw new ForbiddenException();
    }

    if (!chat.participants.includes(user.id)) {
      throw new ForbiddenException();
    }

    const message = await this.messagesService.create({
      text: input.text,
      chatID: chat.id,
      senderID: user.id,
    });

    const messageNode: Message = {
      senderName: user.name,
      id: message.id,
      creationDate: message.creationDate,
      text: message.text,
      senderID: user.id,
    };

    const messageEdge = {
      cursor: encode(message.creationDate.toISOString()),
      node: messageNode,
    };

    chat.participants
      .filter((participant) => participant !== user.id)
      .forEach((userID) => {
        pubSub.publish('messageAdded', {
          messageAdded: messageEdge,
          chatID: chat.id,
          userID,
        });
      });

    return {
      messageEdge,
    };
  }

  @UseGuards(new AuthGuard())
  @Mutation((returns) => RemoveMessageResponse)
  async removeMessage(
    @Context() context: any,
    @Args('id',  { type: () => ID }) id: string,
  ): Promise<RemoveMessageResponse> {
    const { user } = context;

    if (!user) {
      throw new ForbiddenException();
    }

    const message = await this.messagesService.findOneById(id);

    if (!message) {
      throw new ForbiddenException();
    }

    if (message.senderID !== user.id) {
      throw new ForbiddenException();
    }

    const removedMessageID = await this.messagesService.remove(id);

    const chat = await this.chatsService.findOneById(message.chatID);

    chat.participants
      .filter((participant) => participant !== user.id)
      .forEach((userID) => {
        pubSub.publish('messageRemoved', {
          messageRemoved: [removedMessageID],
          chatID: chat.id,
          userID,
        });
      });

    return {
      messageID: removedMessageID,
    };
  }

  @UseGuards(new AuthGuard())
  @Subscription((returns) => MessageEdge, {
    filter: filterRecipient,
  })
  messageAdded(@Args('chatID') chatID: string) {
    return pubSub.asyncIterableIterator('messageAdded');
  }

  @UseGuards(new AuthGuard())
  @Subscription((returns) => [ID], {
    filter: filterRecipient,
  })
  messageRemoved(@Args('chatID') chatID: string) {
    return pubSub.asyncIterableIterator('messageRemoved');
  }

  @UseGuards(new AuthGuard())
  @Subscription((returns) => Message, {
    filter: filterRecipient,
  })
  messageUpdated(@Args('chatID') chatID: string) {
    return pubSub.asyncIterableIterator('messageUpdated');
  }
}
