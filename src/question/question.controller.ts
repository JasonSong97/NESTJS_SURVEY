import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
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
  postQuestion(
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionService.postQuestion(createQuestionDto);
  }

  /**
   * 특정 질문 수정
   */
  @Put(':id')
  putQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.putQuestion(id, updateQuestionDto);
  }

  /**
   * 특정 질문 삭제
   */
  @Delete(':id')
  deleteQuestion(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.deleteQuestion(id);
  }
}
