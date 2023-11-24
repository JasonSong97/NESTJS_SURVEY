import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { SurveyService } from './survey.service';

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
  postSurvey(
    @Body('title') title: string, 
    @Body('content') content: string,
  ) {
    return this.surveyService.postSurvey(title, content);
  }

  /**
   * 특정 설문지 수정
   */
  @Put(':id')
  putSurvey(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string, 
    @Body('content') content: string
  ) {
    return this.surveyService.putSurvey(id, title, content);
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
