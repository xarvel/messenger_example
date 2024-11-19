import { Injectable } from '@nestjs/common';
import { MessagesArgs } from './dto/messages.args';
import { uid } from 'uid';

export const encode = (str: string) => Buffer.from(str).toString('base64');
export const decode = (str: string) =>
  Buffer.from(str, 'base64').toString('ascii');

type CreateMessageData = {
  text: string;
  senderID: string;
  chatID: string;
};

export type MessageRecord = {
  id: string;
  text: string;
  senderID: string;
  chatID: string;
  creationDate: Date;
};

@Injectable()
export class MessagesService {
  private messages: MessageRecord[] = [];

  async create(data: CreateMessageData): Promise<MessageRecord> {
    const message = {
      id: uid(10),
      text: data.text,
      creationDate: new Date(),
      senderID: data.senderID,
      chatID: data.chatID,
    };

    this.messages.push(message);
    return message;
  }

  async findOneById(id: string): Promise<MessageRecord> {
    return this.messages.find((message) => message.id === id);
  }

  sortedMessages() {
    return this.messages.sort(
      (b, a) => b.creationDate.getTime() - a.creationDate.getTime(),
    );
  }

  async getPagintated(messagesArgs: MessagesArgs) {
    const sortedList = this.sortedMessages();

    let result = [];

    if (messagesArgs.last) {
      const beforeCursor = messagesArgs.before
        ? new Date(decode(messagesArgs.before))
        : new Date();

      const filtered = sortedList.filter(
        (message) => message.creationDate < beforeCursor,
      );

      result = filtered.slice(
        filtered.length >= messagesArgs.last
          ? filtered.length - messagesArgs.last
          : 0,
        filtered.length,
      );
    }

    if (messagesArgs.first) {
      const afterCursor = messagesArgs.after
        ? new Date(decode(messagesArgs.after))
        : new Date(0);

      const filtered = sortedList.filter(
        (message) => message.creationDate > afterCursor,
      );

      result = filtered.slice(
        0,
        filtered.length >= messagesArgs.first
          ? messagesArgs.first
          : filtered.length,
      );
    }

    let startCursor,
      endCursor,
      hasPreviousPage = false,
      hasNextPage = false;

    if (result.length > 0) {
      const startDate = result[0].creationDate;
      const endDate = result[result.length - 1].creationDate;
      startCursor = encode(startDate.toISOString());
      endCursor = encode(endDate.toISOString());

      hasPreviousPage = sortedList.some(
        (message) => message.creationDate < startDate,
      );
      hasNextPage = sortedList.some(
        (message) => message.creationDate > endDate,
      );
    }

    return { result, hasPreviousPage, startCursor, endCursor, hasNextPage };
  }

  async remove(id: string): Promise<string> {
    this.messages = this.messages.filter((message) => message.id !== id);

    return id;
  }
}
