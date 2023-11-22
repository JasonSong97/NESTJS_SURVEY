import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  /**
   * 답변 전체 조회
   */
  async getAnswers() {
    return `This action returns all answer`;
  }

  /**
   * 특정 답변 조회
   */
  async getAnswer(
    id: number
  ) {
    return `This action returns a #${id} answer`;
  }

  /**
   * 답변 생성
   */
  async postAnswer(
    createAnswerDto: CreateAnswerDto
  ) {
    return 'This action adds a new answer';
  }

  /**
   * 특정 답변 수정
   */
  async putAnswer(
    id: number, 
    updateAnswerDto: UpdateAnswerDto
  ) {
    return `This action updates a #${id} answer`;
  }

  /**
   * 특정 답변 삭제
   */
  async deleteAnswer(
    id: number
  ) {
    return `This action removes a #${id} answer`;
  }
}