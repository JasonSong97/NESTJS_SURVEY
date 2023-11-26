import { IsString, Length } from "class-validator";
import { BaseModel } from "src/common/entity/base.entity";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { Question } from "src/question/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Option extends BaseModel{

     @ManyToOne(() => Question, (question) => question.id)
     @JoinColumn({ name: 'question_id' })
     question: Question;

     @Column({length: 250,})
     @IsString({message: stringValidationMessage,})
     @Length(1, 250,{message: lengthValidationMessage,})
     content: string;

     @Column()
     score: number;
}
