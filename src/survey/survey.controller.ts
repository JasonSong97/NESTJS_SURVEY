import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

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
    @Param('id') id: string
  ) {
    return this.surveyService.getSurvey(+id);
  }

  /**
   * 설문지 생성
   */
  @Post()
  postSurvey(
    @Body() createSurveyDto: CreateSurveyDto
  ) {
    return this.surveyService.postSurvey(createSurveyDto);
  }

  /**
   * 특정 설문지 수정
   */
  @Put(':id')
  putSurvey(
    @Param('id') id: string, 
    @Body() updateSurveyDto: UpdateSurveyDto
  ) {
    return this.surveyService.putSurvey(+id, updateSurveyDto);
  }

  /**
   * 특정 설문지 삭제
   */
  @Delete(':id')
  deleteSurvey(
    @Param('id') id: string
  ) {
    return this.surveyService.deleteSurvey(+id);
  }
}
