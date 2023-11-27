import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { Survey } from 'src/survey/entities/survey.entity';

@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  /**
   * 답변 전체 조회
   */
  async getAnswers() {
    return await this.answerRepository.find({
      select: {
        id: true,
        totalScore: true,
      },
      relations:[
        'survey',
      ],
      order: {
        id: 'asc',
      },
    });
  }

  /**
   * 특정 답변 조회
   */
  async getAnswer(
    answerId: number
  ) {
    // 1. answer id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 return
    const answer = await this.answerRepository.findOne({
      select: {
        id: true,
        totalScore: true,
      },
      where: {
        id: answerId,
      },
      relations: [
        'survey',        
      ],
    });
    if (!answer) throw new NotFoundException(`id가 ${answerId}인 answer는 존재하지 않습니다.`);
    return answer;
  }

  /**
   * 답변 생성
   */
  async postAnswer(
    postDto: CreateAnswerDto,
  ) {
    // 1. surveyId로 조회해서 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, answer 생성하면서 survey 같이 create
    // 4. save를 이용해서 answer 저장
    const {totalScore, surveyId} = postDto;
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
    });
    if (!survey) throw new NotFoundException(`id가 ${surveyId}인 survey는 존재하지 않습니다.`);

    const answer = this.answerRepository.create({
        survey,
        totalScore,
    });
    return await this.answerRepository.save(answer);
  }

  /**
   * 특정 답변 수정
   */
  async patchAnswer(
    answerId: number, 
    patchDto: UpdateAnswerDto,
  ) {
    const {totalScore} = patchDto;
    const answer = await this.answerRepository.findOne({
      where: {
        id: answerId,
      },
    });
    if (!answer) throw new NotFoundException(`id가 ${answerId}인 answer는 존재하지 않습니다.}`);
    if (totalScore) answer.totalScore = totalScore;
    return await this.answerRepository.save(answer);
  }

  /**
   * 특정 답변 삭제
   */
  async deleteAnswer(
    answerId: number
  ) {
    // 1. answer id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 삭제 후 answer id만 리턴
    const answer = await this.answerRepository.findOne({
      where: {
        id: answerId,
      },
    });
    if (!answer) throw new NotFoundException(`id가 ${answerId}인 answer는 존재하지 않습니다.`);
    await this.answerRepository.delete(answerId);
    return answerId;
  }
}