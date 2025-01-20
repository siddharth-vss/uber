import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Login, Register, UserService } from './user.service';
import { AuthService } from 'src/services/auth.service';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly auth: AuthService) {}

  @Get()
  getUsers() {
    return 'Get all users';
  }

  @Get('profile')
  getUser(@Req() req: Request) {
    return (req.user);
  }

  @Get('logout')
  async logoutUser(@Req() req: Request , @Res() res :Response) {
    return await this.userService.logoutUser(req,res);
  }

  @Post('login')
  async loginUser(@Body() data: Login) {
    return await this.userService.login(data);
  }

  @Post('register')
  async registerUser(@Body() data: Register) {
    return await this.userService.register(data);
  }
}
