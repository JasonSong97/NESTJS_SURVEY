import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

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
    return await this.surveyRepository.find({
      select: {
        id: true,
        title: true,
        content: true,
      },
      relations:[
        'questions',
        'answers',
        'writer',
      ],
      order: {
        id: 'asc',
      },
    });
  }

  /**
   * 특정 설문지 조회
   */
  async getSurvey(
    surveyId: number
  ) {
    // 1. survey id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 return
    const survey = await this.surveyRepository.findOne({
      select: {
        id: true,
        title: true,
        content: true,
      },
      where: {
        id: surveyId,
      },
      relations:[
        'questions',
        'answers',
        'writer',
      ],
    });
    if (!survey) throw new NotFoundException(`id가 ${surveyId}인 survey는 존재하지 않습니다.}`);
    return survey;
  }

  /**
   * 설문지 생성
   */
  async postSurvey(
    userId: number,
    postDto: CreateSurveyDto,
  ) {
    // 1. 중복된 survey가 있는지 title로 조회
    // 2. 중복된 survey가 있으면, BadRequestException
    // 3. 중복된 survey가 없으면, create()와 writerId를 이용해서 survey 생성
    // 4. save를 이용해서 survey 저장
    const {title, content} = postDto;
    const validationCheck = await this.surveyRepository.findOne({
      where: {
        title,
      },
    });
    if (validationCheck) throw new BadRequestException(`${title}은 이미 존재하는 title 입니다.`);

    const survey = this.surveyRepository.create({
      writer: {
        id: userId,
      },
      ...postDto,
    });
    return await this.surveyRepository.save(survey);
  }

  /**
   * 특정 설문지 수정
   */
  async patchSurvey(
    surveyId: number,
    patchDto: UpdateSurveyDto,
  ) {
    // 1. survey id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 값 변경
    // 4. 변경된 객체를 return
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
    });
    const {title, content} = patchDto;
    if (!survey) throw new NotFoundException(`id가 ${surveyId}인 survey는 존재하지 않습니다.}`);
    if (title) survey.title = title;
    if (content) survey.content = content;
    return await this.surveyRepository.save(survey);
  }

  /**
   * 특정 설문지 삭제
   */
  async deleteSurvey(
    surveyId: number,
  ) {
    // 1. survey id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 삭제 후 survey id만 리턴
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId
      },
    });
    if (!survey) throw new NotFoundException(`id가 ${surveyId}인 survey는 존재하지 않습니다.}`);
    await this.surveyRepository.delete(surveyId);
    return surveyId;
  }
}
