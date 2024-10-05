import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import removeProperties from 'src/utils/removeProperties';
import { CustomRequest } from 'src/utils/customRequest';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.create(body);
    return removeProperties(user, 'password');
  }

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
}
