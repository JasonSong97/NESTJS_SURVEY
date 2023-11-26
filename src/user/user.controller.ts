import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
