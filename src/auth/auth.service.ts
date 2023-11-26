import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { HASH_ROUNDS, JWT_SECRET } from './const/auth.const';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

     constructor(
          private readonly jwtService: JwtService,
          private readonly userService: UserService,
     ) {}

     /**
      * 토큰 생성 메소드
      */
     signToken(user: Pick<User, 'email' | 'id'>, isRefreshToken: boolean) {
          const payload = {
               email: user.email,
               id: user.id,
               type: isRefreshToken ? 'refresh' : 'access',
          };

          return this.jwtService.sign(payload, {
               secret: JWT_SECRET,
               expiresIn: isRefreshToken ? 3600 : 300,
          });
     }

     // 토큰 생성 담당
     loginUser(user: Pick<User, 'email' | 'id'>) {
          return {
               accessToken: this.signToken(user, false),
               refreshToken: this.signToken(user, true),
          }
     }

     async authenticateWithEmailAndPassword(user: Pick<User, 'email' | 'password'>) {
          const existingUser = await this.userService.getUserByEmail(user.email);
          if (!existingUser) throw new UnauthorizedException('존재하지 않는 사용자입니다.');

          const checkOK = await bcrypt.compare(user.password, existingUser.password);
          if (!checkOK) throw new UnauthorizedException('비밀번호가 틀렸습니다.');
          return existingUser;
     }

     async loginWithEmail(user: Pick<User, 'email' | 'password'>) {
          const existingUser = await this.authenticateWithEmailAndPassword(user);
          return this.loginUser(existingUser); // DB에서 조회된 user로 토큰 생성
     }

     async registerWithEmail(user: RegisterUserDto) {
          const hash = await bcrypt.hash(
               user.password,
               HASH_ROUNDS,
          );

          const newUser = await this.userService.createUser({
               ...user,
               password: hash,
          });
          return this.loginUser(newUser);
     }

     /**
      * token guard
      */
     verifyToken(token: string) {
          try {
               return this.jwtService.verify(token, {
                    secret: JWT_SECRET,
               });
          } catch (error) {
               throw new UnauthorizedException('토큰이 만료됐거나 잘못된 토큰입니다.');
          }
     }

     /**
      * 토큰 검증 메소드
      */
     extractTokenFromHeader(header: string, isBearer: boolean) {
          const splitToken = header.split(' ');
          const prefix = isBearer ? 'Bearer' : 'Basic';
          if (splitToken.length !== 2 || splitToken[0] !== prefix) throw new UnauthorizedException('잘못된 토큰입니다!');
          const token = splitToken[1];
          return token;
     }

     decodeBasicToken(base64String: string) {
          const decoded = Buffer.from(base64String, 'base64').toString('utf8');
          const split = decoded.split(':');
          if (split.length !== 2) throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
          const email = split[0];
          const password = split[1];
          return {
               email,
               password,
          }
     }

     rotateToken(token: string, isRefreshToken: boolean) {
          const decoded = this.jwtService.verify(token, {
               secret: JWT_SECRET,
          });
          if (decoded.type !== 'refresh') throw new UnauthorizedException('토큰 재발급은 Refresh 토큰으로만 가능합니다');

          return this.signToken({
               ...decoded,
          }, isRefreshToken);
     }
}
