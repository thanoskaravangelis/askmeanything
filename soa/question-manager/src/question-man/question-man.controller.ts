import { Controller, Get } from '@nestjs/common';
import { QuestionManService } from './question-man.service';

@Controller('question-man')
export class QuestionManController {
  constructor(private readonly questionManService: QuestionManService) {}

  @Get('questions')
  getQuestions() {
    return this.questionManService.getQuestions();
  }
}
