import { BaseModel } from "src/common/entity/base.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Option } from "src/option/entities/option.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Question extends BaseModel{

     @ManyToOne(() => Survey, (survey) => survey.id)
     @JoinColumn({ name: 'survey_id'})
     survey: Survey;

     @OneToMany(() => Option, (option) => option.question)
     options: Option[];

     @Column()
     content: string;
}
