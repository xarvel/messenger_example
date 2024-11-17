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

type Message = {
  id: string;
  text: string;
  senderID: string;
  chatID: string;
  creationDate: Date;
};

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  async create(data: CreateMessageData): Promise<Message> {
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

  async findOneById(id: string): Promise<Message> {
    return this.messages.find((message) => message.id === id);
  }

  async findAll(messagesArgs: MessagesArgs): Promise<Message[]> {
    const cursor = messagesArgs.before
      ? new Date(decode(messagesArgs.before))
      : new Date();

    return this.messages
      .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
      .filter((message) => message.creationDate < cursor);
  }

  async remove(id: string): Promise<string> {
    this.messages = this.messages.filter((message) => message.id !== id);

    return id;
  }
}
