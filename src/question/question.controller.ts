import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/question')
@ApiTags('질문 API')
export class QuestionController {

  constructor(private readonly questionService: QuestionService) {}

  /**
   * 질문 전체 조회
   */
  @Get('all')
  @ApiOperation({ summary: '질문 전체 조회 API', description: '질문 전체를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  getQuestions() {
    return this.questionService.getQuestions();
  }
  
  /**
   * 특정 질문 조회
   */
  @Get(':id')
  @ApiOperation({ summary: '특정 질문 조회 API', description: '특정 질문을 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  @ApiParam({ name: 'id', description: '질문의 id' })
  getQuestion(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.getQuestion(id);
  }

  /**
   * 질문 생성
   */
  @Post()
  @ApiOperation({ summary: '질문 생성 API', description: '질문을 생성한다.' })
  @ApiBearerAuth()
  postQuestion(
    @Body() body: CreateQuestionDto,
  ) {
    return this.questionService.postQuestion(body);
  }

  /**
   * 특정 질문 수정
   */
  @Patch(':id')
  @ApiOperation({ summary: '특정 질문 수정 API', description: '특정 질문을 수정한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '질문의 id' })
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
  @ApiOperation({ summary: '특정 질문 삭제 API', description: '특정 질문을 삭제한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '질문의 id' })
  @UseGuards(AccessTokenGuard)
  deleteQuestion(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.questionService.deleteQuestion(id);
  }
}
