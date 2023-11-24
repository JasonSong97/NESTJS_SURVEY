import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class OptionService {

  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  /**
   * 옵션 전체 조회
   */
  async getOptions() {
    return await this.optionRepository.find({
      relations:[
        'question',
      ],
      order: {
        id: 'asc',
      },
    });
  }

  /**
   * 특정 옵션 조회
   */
  async getOption(
    id: number
  ) {
    // 1. option id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 return
    const option = await this.optionRepository.findOne({
      where: {
        id,
      },
      relations:[
        'question',
      ],
    });
    if (!option) throw new NotFoundException(`id가 ${id}인 option은 존재하지 않습니다.}`);
    return option;
  }

  /**
   * 옵션 생성
   */
  async postOption(
    questionId: number,
    score: number,
    content: string,
  ) {
    // 1. 중복된 option이 있는지 content로 조회
    // 2. 중복된 option이 있으면, BadRequestException
    // 3. 없으면 questionId로 조회해서 있는지 없는지 확인 questionId가 없는 경우 NotFoundException
    // 4. question이 존재하는 경우 option을 생성할 때 같이 create
    // 5. save를 이용해서 option 저장
    const validationCheck = await this.optionRepository.findOne({
      where: {
        content,
      },
    });
    if (validationCheck) throw new BadRequestException(`${content}은 이미 존재하는 content 입니다.`);
    
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (!question) throw new NotFoundException(`id가 ${questionId}인 question은 존재하지 않습니다.}`);
  
    const option = this.optionRepository.create({ // await 필요 없음
      content,
      score,
      question,
    });
    return await this.optionRepository.save(option);
  }

  /**
   * 특정 옵션 수정
   */
  async putOption(
    id: number, 
    score: number,
    content: string,
  ) {
    const option = await this.optionRepository.findOne({
      where: {
        id,
      },
    });
    if (!option) throw new NotFoundException(`id가 ${id}인 option은 존재하지 않습니다.}`);
    if (score) option.score = score;
    if (content) option.content = content;
    return await this.optionRepository.save(option);
  }

  /**
   * 특정 옵션 삭제
   */
  async deleteOption(
    id: number
  ) {
    // 1. option id의 존재 유무 확인
    // 2. 없으면, NotFoundException
    // 3. 있으면, 그대로 삭제 후 option id만 리턴
    const option = await this.optionRepository.findOne({
      where: {
        id,
      },
    });
    if (!option) throw new NotFoundException(`id가 ${id}인 option은 존재하지 않습니다.}`);
    await this.optionRepository.delete(id);
    return id;
  }
}
