import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {

  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  /**
   * 옵션 전체 조회
   */
  getOptions() {
    return `This action returns all option`;
  }

  /**
   * 특정 옵션 조회
   */
  getOption(id: number) {
    return `This action returns a #${id} option`;
  }

  /**
   * 옵션 생성
   */
  postOption(createOptionDto: CreateOptionDto) {
    return 'This action adds a new option';
  }

  /**
   * 특정 옵션 수정
   */
  putOption(id: number, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  /**
   * 특정 옵션 삭제
   */
  deleteOption(id: number) {
    return `This action removes a #${id} option`;
  }
}
