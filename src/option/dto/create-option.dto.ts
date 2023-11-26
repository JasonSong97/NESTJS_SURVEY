import { PickType } from "@nestjs/mapped-types";
import { Option } from "../entities/option.entity";

export class CreateOptionDto extends PickType(Option, ['content', 'score']){

     questionId: number
}
