import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './dto/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(key: string, pass: string): Promise<User> {
    const user = await this.usersService.user({
      email: key,
    });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
