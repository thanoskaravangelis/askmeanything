import { Module } from '@nestjs/common';
import { QuestionManService } from './question-man.service';
import { QuestionManController } from './question-man.controller';

@Module({
  controllers: [QuestionManController],
  providers: [QuestionManService]
})
export class QuestionManModule {}
