import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const choreo = 'http://localhost:3060';
  
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: choreo,
    });
  
    await app.listen(3053);
  
  }
  bootstrap();
