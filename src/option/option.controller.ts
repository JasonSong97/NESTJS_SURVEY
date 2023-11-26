import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('api/option')
export class OptionController {

  constructor(private readonly optionService: OptionService) {}

  /**
   * 옵션 전체 조회
   */
  @Get('all')
  getOptions() {
    return this.optionService.getOptions();
  }
  
  /**
   * 특정 옵션 조회
   */
  @Get(':id')
  getOption(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.optionService.getOption(id);
  }

  /**
   * 옵션 생성
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  postOption(
    @Body() body: CreateOptionDto,
  ) {
    return this.optionService.postOption(body);
  }

  /**
   * 특정 옵션 수정
   */
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  patchOption(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: UpdateOptionDto,
  ) {
    return this.optionService.patchOption(id, body);
  }

  /**
   * 특정 옵션 삭제
   */
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deleteOption(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.optionService.deleteOption(id);
  }
}