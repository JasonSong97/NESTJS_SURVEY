import { PickType } from "@nestjs/mapped-types";
import { Question } from "../entities/question.entity";

export class CreateQuestionDto extends PickType(Question, ['content']){

     surveyId: number;
}