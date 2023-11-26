import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('유저 API')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '사용자 전체 조회 API', description: '전체 사용자를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
