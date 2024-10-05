import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './dto/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(key: string, password: string): Promise<User> {
    const user = await this.userService.user({ email: key });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;
    return user;
  }

  async login(user: User) {
    const payload: JWTPayload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
