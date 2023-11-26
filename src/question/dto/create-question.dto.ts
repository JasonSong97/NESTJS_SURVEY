import { PickType } from "@nestjs/mapped-types";
import { Question } from "../entities/question.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto extends PickType(Question, ['content']){

     @ApiProperty({ description: '설문지 번호' })
     surveyId: number;
}