import { Controller } from '@nestjs/common';
import { QuestionRunServiceService } from './question-run-service.service';

@Controller('question-run-service')
export class QuestionRunServiceController {
  constructor(private readonly questionRunServiceService: QuestionRunServiceService) {}
}
