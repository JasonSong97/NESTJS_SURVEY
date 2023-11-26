import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 가장 중요: 전역적으로 작용!
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
