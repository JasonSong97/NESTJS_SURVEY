import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     @ApiProperty({ description: '내용' })
     content?: string;
}
