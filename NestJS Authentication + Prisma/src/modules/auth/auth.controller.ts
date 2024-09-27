import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import removeProperties from 'src/utils/removeProperties';
import { CustomRequest } from 'src/utils/customRequest';
import { LocalAuthGuard } from './jwt/local.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: CustomRequest) {
    const accessToken = await this.authService.login(req.user);
    return {
      access_token: accessToken,
      user: removeProperties(req.user, 'password'),
    };
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.create(body);
    return removeProperties(user, 'password');
  }
}
