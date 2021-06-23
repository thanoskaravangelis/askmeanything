import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionRunModule } from './question-run/question-run.module';

@Module({
  imports: [QuestionRunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
