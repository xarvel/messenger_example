import { Injectable } from '@nestjs/common';
import { USER_ID_1, USER_ID_2 } from '../users/users.service';

const CHAT_ID_1 = 'chat1';

type Chat = {
  id: string;
  participants: string[];
};

@Injectable()
export class ChatsService {
  private chats: Chat[] = [
    {
      id: CHAT_ID_1,
      participants: [USER_ID_1, USER_ID_2],
    },
  ];

  async findOneById(id: string): Promise<Chat | null> {
    return this.chats.find((user) => user.id === id);
  }
}
