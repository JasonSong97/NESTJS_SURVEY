import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {

     @IsString({message: stringValidationMessage,})
     @IsOptional()
     @ApiProperty({ description: '내용' })
     content?: string;

     @IsOptional()
     @ApiProperty({ description: '점수' })
     score?: number;
}
