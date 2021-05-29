import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionRunServiceModule } from './question-run-service/question-run-service.module';

@Module({
  imports: [QuestionRunServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
