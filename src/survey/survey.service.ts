import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  /**
   * 설문지 전체 조회
   */
  async getSurveys() {
    return `전체를 조회해서 보내줍니다.`;
  }

  /**
   * 특정 설문지 조회
   */
  async getSurvey(id: number) {
    return `This action returns a #${id} survey`;
  }

  /**
   * 설문지 생성
   */
  async postSurvey(createSurveyDto: CreateSurveyDto) {
    return 'This action adds a new survey';
  }

  /**
   * 특정 설문지 수정
   */
  async putSurvey(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  /**
   * 특정 설문지 삭제
   */  
  async deleteSurvey(id: number) {
    return `This action removes a #${id} survey`;
  }
}
