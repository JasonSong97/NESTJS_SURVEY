import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('api/option')
export class OptionController {

  constructor(private readonly optionService: OptionService) {}

  /**
   * 옵션 전체 조회
   */
  @Get()
  getOptions() {
    return this.optionService.getOptions();
  }
  
  /**
   * 특정 옵션 조회
   */
  @Get(':id')
  getOption(@Param('id') id: string) {
    return this.optionService.getOption(+id);
  }

  /**
   * 옵션 생성
   */
  @Post()
  postOption(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.postOption(createOptionDto);
  }

  /**
   * 특정 옵션 수정
   */
  @Put(':id')
  putOption(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.putOption(+id, updateOptionDto);
  }

  /**
   * 특정 옵션 삭제
   */
  @Delete(':id')
  deleteOption(@Param('id') id: string) {
    return this.optionService.deleteOption(+id);
  }
}