import { PickType } from "@nestjs/mapped-types";
import { Answer } from "../entities/answer.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto extends PickType(Answer, ['totalScore']){

     @ApiProperty({ description: '설문지 번호' })
     surveyId: number;
}
