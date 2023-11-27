import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/survey')
@ApiTags('설문지 API')
export class SurveyController {
  
  constructor(private readonly surveyService: SurveyService) {}

  /**
   * 설문지 전체 조회 GET
   */
  @Get('all')
  @ApiOperation({ summary: '설문지 전체 조회 API', description: '설문지 전제를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  getSurveys() {
    return this.surveyService.getSurveys();
  }

  /**
   * 특정 설문지 조회 GET
   */
  @Get(':surveyId')
  @ApiOperation({ summary: '특정 설문지 조회 API', description: '특정 설문지를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  @ApiParam({ name: 'surveyId', description: '설문지의 id' })
  getSurvey(
    @Param('surveyId', ParseIntPipe) surveyId: number
  ) {
    return this.surveyService.getSurvey(surveyId);
  }

  /**
   * 설문지 생성 POST
   */
  @Post()
  @ApiOperation({ summary: '설문지 생성 API', description: '설문지를 생성한다.' })
  @ApiBearerAuth('AccessTokenGuard사용')
  @ApiBody({ type: CreateSurveyDto })
  @UseGuards(AccessTokenGuard)
  postSurvey(
    @Member('id') userId: number, 
    @Body() body: CreateSurveyDto,
  ) {
    return this.surveyService.postSurvey(userId, body);
  }

  /**
   * 특정 설문지 수정 PATCH
   */
  @Patch(':surveyId')
  @ApiOperation({ summary: '특정 설문지 수정 API', description: '특정 설문지를 수정한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'surveyId', description: '설문지의 id' })
  @UseGuards(AccessTokenGuard)
  patchSurvey(
    @Member('id') userId: number,
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @Body() body: UpdateSurveyDto,
  ) {
    return this.surveyService.patchSurvey(surveyId, body);
  }

  /**
   * 특정 설문지 삭제 DELETE
   */
  @Delete(':surveyId')
  @ApiOperation({ summary: '특정 설문지 삭제 API', description: '특정 설문지를 삭제한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'surveyId', description: '설문지의 id' })
  @UseGuards(AccessTokenGuard)
  deleteSurvey(
    @Member('id') userId: number,
    @Param('surveyId', ParseIntPipe) surveyId: number
  ) {
    return this.surveyService.deleteSurvey(surveyId);
  }
}
