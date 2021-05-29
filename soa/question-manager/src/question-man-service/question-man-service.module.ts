import { Module } from '@nestjs/common';
import { QuestionManServiceService } from './question-man-service.service';
import { QuestionManServiceController } from './question-man-service.controller';

@Module({
  controllers: [QuestionManServiceController],
  providers: [QuestionManServiceService]
})
export class QuestionManServiceModule {}
