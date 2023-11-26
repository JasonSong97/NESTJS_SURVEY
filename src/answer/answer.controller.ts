import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { Member } from 'src/user/decorator/user.decorator';

@Controller('api/answer')
export class AnswerController {

  constructor(private readonly answerService: AnswerService) {}

  /**
   * 답변 전체 조회
   */
  @Get('all')
  getAnswers() {
    return this.answerService.getAnswers();
  }
  
  /**
   * 특정 답변 조회
   */
  @Get(':id')
  getAnswer(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.getAnswer(id);
  }

  /**
   * 답변 생성
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  postAnswer(
    @Member('id') userId: number,
    @Body() body: CreateAnswerDto,
  ) {
    return this.answerService.postAnswer(body);
  }

  /**
   * 특정 답변 수정
   */
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  patchAnswer(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: UpdateAnswerDto,
  ) {
    return this.answerService.patchAnswer(id, body);
  }

  /**
   * 특정 답변 삭제
   */
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deleteAnswer(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.deleteAnswer(id);
  }
}