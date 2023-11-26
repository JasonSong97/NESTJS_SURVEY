import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "src/common/entity/base.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Answer extends BaseModel{

     @ManyToOne(() => Survey, (survey) => survey.id,{onDelete: 'CASCADE',})
     @JoinColumn({ name: 'survey_id' })
     @ApiProperty({ description: '설문지' })
     survey: Survey;

     @Column({ name: 'total_score' })
     @ApiProperty({ description: '총합' })
     totalScore: number;
}
