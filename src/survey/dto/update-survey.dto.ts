import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyDto } from './create-survey.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     @ApiProperty({ description: '재목' })
     title?: string;

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     @ApiProperty({ description: '내용' })
     content?: string;
}
