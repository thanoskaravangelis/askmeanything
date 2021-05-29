import { Controller } from '@nestjs/common';
import { QuestionManServiceService } from './question-man-service.service';

@Controller('question-man-service')
export class QuestionManServiceController {
  constructor(private readonly questionManServiceService: QuestionManServiceService) {}
}
