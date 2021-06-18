import { Controller } from '@nestjs/common';
import { QuestionRunService } from './question-run.service';

@Controller('question-run')
export class QuestionRunController {
  constructor(private readonly questionRunService: QuestionRunService) {}
}
