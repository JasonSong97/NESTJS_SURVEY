import { Answer } from "src/answer/entities/answer.entity";
import { BaseModel } from "src/common/entity/base.entity";
import { Question } from "src/question/entities/question.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Survey extends BaseModel{

     @Column()
     title: string;

     @Column()
     content: string;

     @OneToMany(() => Question, (question) => question.survey)
     questions: Question[];

     @OneToMany(() => Answer, (answer) => answer.survey)
     answers: Answer[];
     
}
