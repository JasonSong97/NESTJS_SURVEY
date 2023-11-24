import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { Option } from './entities/option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option,
      Question,
    ]),
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
