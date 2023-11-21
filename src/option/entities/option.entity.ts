import { BaseModel } from "src/common/entity/base.entity";
import { Question } from "src/question/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Option extends BaseModel{

     @ManyToOne(() => Question, (question) => question.id)
     @JoinColumn({ name: 'question_id' })
     question: Question;

     @Column()
     content: string;

     @Column()
     score: number;
}
