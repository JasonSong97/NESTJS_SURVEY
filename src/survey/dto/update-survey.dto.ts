import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyDto } from './create-survey.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     title?: string;

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     content?: string;
}
