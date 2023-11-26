import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('api/survey')
export class SurveyController {
  
  constructor(private readonly surveyService: SurveyService) {}

  /**
   * 설문지 전체 조회
   */
  @Get('all')
  getSurveys() {
    return this.surveyService.getSurveys();
  }

  /**
   * 특정 설문지 조회
   */
  @Get(':id')
  getSurvey(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.surveyService.getSurvey(id);
  }

  /**
   * 설문지 생성
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  postSurvey(
    @Member('id') userId: number, 
    @Body() body: CreateSurveyDto,
  ) {
    console.log(userId);
    return this.surveyService.postSurvey(body);
  }

  /**
   * 특정 설문지 수정
   */
  @Patch(':id')
  patchSurvey(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSurveyDto,
  ) {
    return this.surveyService.patchSurvey(id, body);
  }

  /**
   * 특정 설문지 삭제
   */
  @Delete(':id')
  deleteSurvey(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.surveyService.deleteSurvey(id);
  }
}
