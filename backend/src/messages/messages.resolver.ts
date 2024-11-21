import { ForbiddenException, BadRequestException } from '@nestjs/common';
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
import { Message } from './dto/message';
import { encode, MessageRecord, MessagesService } from './messages.service';
import { MessageEdge, MessageConnection } from './dto/message-connection';
import { ChatsService } from '../chats/chats.service';
import { SendMessageResponse } from './dto/send-message-response';
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

const mapMessageEdge = (message: MessageRecord) => {
  const messageNode: Message = {
    id: message.id,
    creationDate: message.creationDate,
    text: message.text,
    senderID: message.senderID,
  };

  return {
    cursor: encode(message.creationDate.toISOString()),
    node: messageNode,
  };
};

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
  ) {}

  @UseGuards(new AuthGuard())
  @Query((returns) => MessageConnection)
  async messages(
    @Context() context: any,
    @Args() messagesArgs: MessagesArgs,
  ): Promise<MessageConnection> {
    if (!messagesArgs.last === !messagesArgs.first) {
      throw new BadRequestException();
    }

    const chat = await this.chatsService.findOneById(messagesArgs.chatID);

    if (!chat) {
      throw new ForbiddenException();
    }

    const { result, hasPreviousPage, endCursor, startCursor, hasNextPage } =
      await this.messagesService.getPagintated(messagesArgs);

    const edges = result.map(mapMessageEdge);

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
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

    const chat = await this.chatsService.findOneById(input.chatID);

    if (!chat || !chat.participants.includes(user.id)) {
      throw new ForbiddenException();
    }

    const message = await this.messagesService.create({
      text: input.text,
      chatID: chat.id,
      senderID: user.id,
    });

    const messageEdge = mapMessageEdge(message);

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
  @Mutation((returns) => [ID])
  async removeMessages(
    @Context() context: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string[]> {
    const { user } = context;

    const message = await this.messagesService.findOneById(id);

    if (!message || message.senderID !== user.id) {
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

    return [removedMessageID];
  }

  @UseGuards(new AuthGuard())
  @Mutation((returns) => Boolean)
  async setTyping(
    @Context() context: any,
    @Args('chatID') chatID: string,
  ): Promise<boolean> {
    const { user } = context;
    const chat = await this.chatsService.findOneById(chatID);

    if (!chat || !chat.participants.includes(user.id)) {
      throw new ForbiddenException();
    }

    chat.participants
      .filter((participant) => participant !== user.id)
      .forEach((userID) => {
        pubSub.publish('isTyping', {
          isTyping: userID,
          chatID: chat.id,
          userID,
        });
      });

    return true;
  }

  @UseGuards(new AuthGuard())
  @Subscription((returns) => ID, {
    filter: filterRecipient,
  })
  isTyping(@Args('chatID') chatID: string) {
    return pubSub.asyncIterableIterator('isTyping');
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
