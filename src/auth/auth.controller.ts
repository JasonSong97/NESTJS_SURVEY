import { Controller, Post, Headers, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  @ApiOperation({ summary: '이메일 로그인 API', description: '이메일과 비밀번호를 Basic 토큰으로 로그인하고 AccessToken과 RefreshToken을 제공한다.' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: '이메일 회원가입 API', description: '이메일과 비밀번호로 회원가입하고 바로 로그인되며 AccessToken과 RefreshToken을 제공한다.' })
  postRegisterEmail(
    @Body() body: RegisterUserDto,
  ) {
    return this.authService.registerWithEmail(body);
  }

  @Post('token/refresh')
  @ApiOperation({ summary: 'RefreshToken 재발급 API', description: 'RefreshToken을 이용해서 새로운 RefreshToken을 제공한다.' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'AccessToken 재발급 API', description: 'RefreshToken을 이용해서 새로운 AccessToken을 제공한다.' })
  @ApiBearerAuth()
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
