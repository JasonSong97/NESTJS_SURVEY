import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

     constructor(
          @InjectRepository(User) 
          private readonly usersRepository: Repository<User>,
     ) {}

     async getUserByEmail(email: string) {
          return await this.usersRepository.findOne({
               where: {
                    email,
               },
          });
     }

     async createUser(user: Pick<User, 'email' | 'nickname' | 'password'>) {
          const nicknameExist = await this.usersRepository.exist({
               where: {
                    nickname: user.nickname,
               },
          });
          if (nicknameExist) throw new BadRequestException('이미 존재하는 nickname입니다.');

          const emailExist = await this.usersRepository.exist({
               where: {
                    email: user.email,
               },
          });
          if (emailExist) throw new BadRequestException('이미 존재하는 email입니다.');

          const userObject = this.usersRepository.create({
               nickname: user.nickname,
               email: user.email,
               password: user.password,
          });
          const newUser = await this.usersRepository.save(userObject);
          return newUser;
     }
}
