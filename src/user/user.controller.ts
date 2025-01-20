import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Login, Register, UserService } from './user.service';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly auth: AuthService) {}

  @Get()
  getUsers() {
    return 'Get all users';
  }

  @Get('profile')
  getUser(@Req() req: Request) {
    const user = req.user;
    return `Get user with id: ${user?.id || 'undefined'}`;
  }

  @Get('logout')
  logoutUser() {
    return `Get user with id: `;
  }

  @Post('login')
  async loginUser(@Body() data: Login) {
    return await this.userService.login(data);
  }

  @Post('register')
  async registerUser(@Body() data: Register) {
    console.log(data);
    return await this.userService.register(data);
  }
}
