import { Controller, Post, Headers, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  postLoginEmail(
    @Headers('authorization') rawToken: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credential = this.authService.decodeBasicToken(token);
    return this.authService.loginWithEmail({
      email: credential.email,
      password: credential.password,
    });
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('email') email: string,
    @Body('nickname') nickname: string,
    @Body('mobile') mobile: number,
    @Body('password') password: string,    
  ) {
    return this.authService.registerWithEmail({
      email,
      nickname,
      mobile,
      password,
    });
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(
    @Headers('authorization') rawToken: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, true); // 새로운 토큰 발급
    return {
      refreshToken: newToken,
    }
  }

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(
    @Headers('authorization') rawToken: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const newToken = this.authService.rotateToken(token, true); // 새로운 토큰 발급
    return {
      accessToken: newToken,
    }
  }
}
