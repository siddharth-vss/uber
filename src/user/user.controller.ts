import { Body, Controller, Get, Post } from '@nestjs/common';
import { Login, Register, UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): string {
    return 'Get all users';
  }
  @Get('profile')
  getUser() {
    return `Get user with id: `;
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
 async registerUser(@Body() data : Register) {
    console.log(data);
   return await this.userService.register(data);
  }
}
