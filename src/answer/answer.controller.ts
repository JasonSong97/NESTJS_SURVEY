import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { Member } from 'src/user/decorator/user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/answer')
@ApiTags('답변 API')
export class AnswerController {

  constructor(private readonly answerService: AnswerService) {}

  /**
   * 답변 전체 조회
   */
  @Get('all')
  @ApiOperation({ summary: '답변 전제 조회 API', description: '답변 전체를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  getAnswers() {
    return this.answerService.getAnswers();
  }
  
  /**
   * 특정 답변 조회
   */
  @Get(':id')
  @ApiOperation({ summary: '특정 답변 조회 API', description: '특졍 답변을 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  @ApiParam({ name: 'id', description: '답변의 id' })
  getAnswer(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.getAnswer(id);
  }

  /**
   * 답변 생성
   */
  @Post()
  @ApiOperation({ summary: '답변 생성 API', description: '답변을 생성한다.' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: '특정 답변 수정 API', description: '특정 답변을 수정한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '답변의 id' })
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
  @ApiOperation({ summary: '특정 답변 삭제 API', description: '특정 답변을 삭제한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '답변의 id' })
  @UseGuards(AccessTokenGuard)
  deleteAnswer(
    @Member('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.answerService.deleteAnswer(id);
  }
}