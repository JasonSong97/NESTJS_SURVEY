import { PickType } from "@nestjs/mapped-types";
import { Option } from "../entities/option.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOptionDto extends PickType(Option, ['content', 'score']){

     @ApiProperty({ description: '질문 번호' })
     questionId: number
}
