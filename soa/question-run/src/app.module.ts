import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionRunServiceModule } from './question-run-service/question-run-service.module';
import { QuestionRunModule } from './question-run/question-run.module';

@Module({
  imports: [QuestionRunServiceModule, QuestionRunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
