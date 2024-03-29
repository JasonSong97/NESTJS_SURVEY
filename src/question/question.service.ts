import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Survey } from 'src/survey/entities/survey.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  /**
   * 질문 전체 조회
   */
  async getQuestions() {
    return await this.questionRepository.find({
      select: {
        id: true,
        content: true,
      },
      relations:[
        'survey',
        'options'
      ],
      order: {
        id: 'asc',
      },
    });
  }

  /**
   * 특정 질문 조회
   */
  async getQuestion(
    questionId: number
  ) {
    // 1. question id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 return
    const question = await this.questionRepository.findOne({
      select: {
        id: true,
        content: true,
      },
      where: {
        id: questionId,
      },
      relations:[
        'survey',
        'options'
      ],
    });
    if (!question) throw new NotFoundException(`id가 ${questionId}인 question는 존재하지 않습니다.}`);
    return question;
  }

  /**
   * 질문 생성
   */
  async postQuestion(
    postDto: CreateQuestionDto,
  ) {
    // 1. 중복된 question이 있는지 content로 조회
    // 2. 중복된 question이 있으면, BadRequestException
    // 3. surveyId 있는지 없는지 조회
    // 4. 없으면 BadRequestException
    // 5. 있으면 조회된 survey를 question create할 때, 같이 넣기
    // 6. save를 이용해서 question 저장
    const {content, surveyId} = postDto;
    const validationCheck = await this.questionRepository.findOne({
      where: {
        content,
      },
    });
    if (validationCheck) throw new BadRequestException(`${content}은 이미 존재하는 content 입니다.`);
    
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
    });
    if (!survey) throw new NotFoundException(`id가 ${surveyId}인 survey는 존재하지 않습니다.}`);
  
    const question = this.questionRepository.create({ // await 필요 없음
      ...postDto,
      survey,
    });
    return await this.questionRepository.save(question);
  }

  /**
   * 특정 질문 수정
   */
  async patchQuestion(
    questionId: number, 
    patchDto: UpdateQuestionDto,
  ) {
    // 1. question id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 값 변경
    // 4. 변경된 객체를 return
    const {content} = patchDto;
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (!question) throw new NotFoundException(`id가 ${questionId}인 question는 존재하지 않습니다.}`);
    if (content) question.content = content;
    return await this.questionRepository.save(question);
  }

  /**
   * 특정 질문 삭제
   */
  async deleteQuestion(
    questionId: number
  ) {
    // 1. question id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 삭제 후 question id만 리턴
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (!question) throw new NotFoundException(`id가 ${questionId}인 question는 존재하지 않습니다.}`);
    await this.questionRepository.delete(questionId);
    return questionId;
  }
}
