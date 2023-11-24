import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
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
  getAnswer(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.getAnswer(id);
  }

  /**
   * 답변 생성
   */
  @Post()
  postAnswer(
    @Body('surveyId') surveyId: number,
    @Body('totalScore') totalScore: number,
  ) {
    return this.answerService.postAnswer(surveyId, totalScore);
  }

  /**
   * 특정 답변 수정
   */
  @Put(':id')
  putAnswer(
    @Param('id', ParseIntPipe) id: number, 
    @Body('totalScore') totalScore: number,
  ) {
    return this.answerService.putAnswer(id, totalScore);
  }

  /**
   * 특정 답변 삭제
   */
  @Delete(':id')
  deleteAnswer(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.deleteAnswer(id);
  }
}