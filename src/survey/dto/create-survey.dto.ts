import { PickType } from "@nestjs/mapped-types";
import { Survey } from "../entities/survey.entity";

export class CreateSurveyDto extends PickType(Survey, ['title', 'content']){}
