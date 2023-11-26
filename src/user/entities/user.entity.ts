import { BaseModel } from "src/common/entity/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { IsEmail, IsString, Length } from "class-validator";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { emailValidationMessage } from "src/common/validation-message/email-validation.message";
import { Survey } from "src/survey/entities/survey.entity";

@Entity()
export class User extends BaseModel{

     @Column({unique: true})
     @IsString({message: stringValidationMessage,})
     @IsEmail({}, {message: emailValidationMessage,})
     email: string;

     @Column()
     @IsString({message: stringValidationMessage,})
     @Length(3, 8,{message: lengthValidationMessage,})
     password: string;

     @Column({length: 20, unique: true,})
     @IsString({message: stringValidationMessage,})
     @Length(1, 20,{message: lengthValidationMessage,})
     nickname: string;

     @Column({
          enum: Object.values(RolesEnum),
          default: RolesEnum.USER
     })
     role: RolesEnum;


     // test
     @OneToMany(() => Survey, (survey) => survey.writer)
     surveys: Survey[];
}