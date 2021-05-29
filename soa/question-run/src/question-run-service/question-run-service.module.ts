import { Module } from '@nestjs/common';
import { QuestionRunServiceService } from './question-run-service.service';
import { QuestionRunServiceController } from './question-run-service.controller';

@Module({
  controllers: [QuestionRunServiceController],
  providers: [QuestionRunServiceService]
})
export class QuestionRunServiceModule {}
