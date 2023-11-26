import { BaseModel } from "src/common/entity/base.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Option } from "src/option/entities/option.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { IsString, Length } from "class-validator";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Question extends BaseModel{

     @ManyToOne(() => Survey, (survey) => survey.id,{onDelete: 'CASCADE',})
     @JoinColumn({ name: 'survey_id'})
     @ApiProperty({ description: '설문지' })
     survey: Survey;

     @OneToMany(() => Option, (option) => option.question,)
     options: Option[];

     @Column({length: 550,})
     @IsString({message: stringValidationMessage,})
     @Length(0, 500,{message: lengthValidationMessage,})
     @ApiProperty({ description: '내용' })
     content: string;
}
