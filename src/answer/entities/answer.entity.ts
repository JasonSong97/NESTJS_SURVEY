import { BaseModel } from "src/common/entity/base.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Answer extends BaseModel{

     @ManyToOne(() => Survey, (survey) => survey.id,{onDelete: 'CASCADE',})
     @JoinColumn({ name: 'survey_id' })
     survey: Survey;

     @Column({ name: 'total_score' })
     totalScore: number;
}
