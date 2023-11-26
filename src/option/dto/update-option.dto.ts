import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     content?: string;

     @IsOptional()
     score?: number;
}
