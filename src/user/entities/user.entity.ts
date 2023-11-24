import { BaseModel } from "src/common/entity/base.entity";
import { Column, Entity } from "typeorm";
import { RolesEnum } from "../const/roles.const";

@Entity()
export class User extends BaseModel{

     @Column({
          unique: true
     })
     email: string;

     @Column()
     password: string;

     @Column()
     nickname: string;

     @Column()
     mobile: number;

     @Column({
          enum: Object.values(RolesEnum),
          default: RolesEnum.USER
     })
     role: RolesEnum;
}