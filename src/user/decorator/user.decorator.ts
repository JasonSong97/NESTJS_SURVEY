import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { User } from "../entities/user.entity";

export const Member = createParamDecorator((data: keyof User | undefined, context: ExecutionContext) => {
     const req = context.switchToHttp().getRequest();
     const user = req.user as User;
     if (!user) throw new InternalServerErrorException('User 데코레이터는 AccessTokenGuard와 함께 사용해야합니다.');

     if (data) return user[data];

     return user;
});