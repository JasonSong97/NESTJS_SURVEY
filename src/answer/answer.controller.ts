import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

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
  getAnswer(@Param('id') id: string) {
    return this.answerService.getAnswer(+id);
  }

  /**
   * 답변 생성
   */
  @Post()
  postAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.postAnswer(createAnswerDto);
  }

  /**
   * 특정 답변 수정
   */
  @Put(':id')
  putAnswer(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.putAnswer(+id, updateAnswerDto);
  }

  /**
   * 특정 답변 삭제
   */
  @Delete(':id')
  deleteAnswer(@Param('id') id: string) {
    return this.answerService.deleteAnswer(+id);
  }
}