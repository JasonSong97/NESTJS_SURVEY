import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { BaseModel } from "src/common/entity/base.entity";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { Question } from "src/question/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Option extends BaseModel{

     @ManyToOne(() => Question, (question) => question.id,{onDelete: 'CASCADE',})
     @JoinColumn({ name: 'question_id' })
     @ApiProperty({ description: '질문' })
     question: Question;

     @Column({length: 250,})
     @IsString({message: stringValidationMessage,})
     @Length(1, 250,{message: lengthValidationMessage,})
     @ApiProperty({ description: '내용' })
     content: string;

     @Column()
     @ApiProperty({ description: '점수' })
     score: number;
}
