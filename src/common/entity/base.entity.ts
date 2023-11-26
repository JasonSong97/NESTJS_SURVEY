import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {
     
     @PrimaryGeneratedColumn()
     @ApiProperty({ description: '아이디' })
     id: number;

     @UpdateDateColumn({ name: 'updated_at' })
     @ApiProperty({ description: '업데이트된 날짜' })
     updatedAt: Date;

     @CreateDateColumn({ name: 'created_at' })
     @ApiProperty({ description: '생성된 날짜' })
     createdAt: Date;
}