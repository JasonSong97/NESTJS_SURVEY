import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { Answer } from "src/answer/entities/answer.entity";
import { BaseModel } from "src/common/entity/base.entity";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Survey extends BaseModel{

     @Column({length: 15,})
     @IsString({message: stringValidationMessage,})
     @Length(1, 15,{message: lengthValidationMessage,})
     @ApiProperty({ description: '제목' })
     title: string;

     @Column({length: 500,})
     @IsString({message: stringValidationMessage,})
     @Length(0, 500,{message: lengthValidationMessage,})
     @ApiProperty({ description: '내용' })
     content: string;

     @OneToMany(() => Question, (question) => question.survey)
     questions: Question[];

     @OneToMany(() => Answer, (answer) => answer.survey)
     answers: Answer[];
     


     // test
     @ManyToOne(() => User, (user) => user.surveys, {
          nullable: false,
     })
     @JoinColumn({ name: 'writer_id'})
     @ApiProperty({ description: '작성자' })
     writer: User;
}
