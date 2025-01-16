import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getUsers(): string {
    return 'Get all users';
  }
  @Get('/profile')
  getUser() {
    return `Get user with id: `;
  }
  @Get('/logout')
  logoutUser() {
    return `Get user with id: `;
  }
  @Post('/login')
  loginUser() {
    return `Login user with email: `;
  }
  @Post('/register')
  registerUser() {
    return `Register user with email: `;
  }
}
