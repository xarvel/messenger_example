import { Injectable } from '@nestjs/common';

export const USER_ID_1 = 'user1';
export const USER_ID_2 = 'user2';

type User = {
  id: string;
  name: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: USER_ID_1,
      name: 'Александр',
    },
    {
      id: USER_ID_2,
      name: 'Катя',
    },
  ];

  async findOneById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id);
  }
}
