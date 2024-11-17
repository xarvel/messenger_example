import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Module({
  providers: [UsersService, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
