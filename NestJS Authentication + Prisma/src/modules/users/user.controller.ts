import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import removeProperties from 'src/utils/removeProperties';
import { CustomRequest } from 'src/utils/customRequest';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.users({});
    const usersWithoutPassword = users.map((user) =>
      removeProperties(user, 'password'),
    );
    return usersWithoutPassword;
  }

  @Get('me')
  async findMe(@Request() req: CustomRequest) {
    const user = await this.userService.user({
      id: req.user.id,
    });
    return removeProperties(user, 'password');
  }
}
