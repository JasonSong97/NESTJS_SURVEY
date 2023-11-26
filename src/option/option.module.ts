import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { Option } from './entities/option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option,
      Question,
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
