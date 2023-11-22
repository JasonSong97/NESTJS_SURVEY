import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  /**
   * 질문 전체 조회
   */
  async getQuestions() {
    return `This action returns all question`;
  }

  /**
   * 특정 질문 조회
   */
  async getQuestion(id: number) {
    return `This action returns a #${id} question`;
  }

  /**
   * 질문 생성
   */
  async postQuestion(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  /**
   * 특정 질문 수정
   */
  async putQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  /**
   * 특정 질문 삭제
   */
  async deleteQuestion(id: number) {
    return `This action removes a #${id} question`;
  }
}
