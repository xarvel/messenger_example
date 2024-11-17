import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getUserFromToken(token: string) {
    return this.usersService.findOneById(token);
  }
}
