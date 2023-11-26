import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';

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
  postQuestion(
    @Body() body: CreateQuestionDto,
  ) {
    return this.questionService.postQuestion(body);
  }

  /**
   * 특정 질문 수정
   */
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  patchQuestion(
    @Member('id') userId: number,
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
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.deleteQuestion(id);
  }
}
