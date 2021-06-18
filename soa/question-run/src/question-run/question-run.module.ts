import { Module } from '@nestjs/common';
import { QuestionRunService } from './question-run.service';
import { QuestionRunController } from './question-run.controller';

@Module({
  controllers: [QuestionRunController],
  providers: [QuestionRunService]
})
export class QuestionRunModule {}
