import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('api/question')
export class QuestionController {

  constructor(private readonly questionService: QuestionService) {}

  /**
   * 질문 전체 조회
   */
  @Get('all')
  getQuestions() {
    return this.questionService.getQuestions();
  }
  
  /**
   * 특정 질문 조회
   */
  @Get(':id')
  getQuestion(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.getQuestion(id);
  }

  /**
   * 질문 생성
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  postQuestion(
    @Body('surveyId', ParseIntPipe) surveyId: number,
    @Body('content') content: string,
  ) {
    return this.questionService.postQuestion(surveyId, content);
  }

  /**
   * 특정 질문 수정
   */
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  patchQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuestionDto,
  ) {
    return this.questionService.patchQuestion(id, body);
  }

  /**
   * 특정 질문 삭제
   */
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deleteQuestion(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.deleteQuestion(id);
  }
}
