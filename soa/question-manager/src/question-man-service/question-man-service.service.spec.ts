import { Test, TestingModule } from '@nestjs/testing';
import { QuestionManServiceService } from './question-man-service.service';

describe('QuestionManServiceService', () => {
  let service: QuestionManServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionManServiceService],
    }).compile();

    service = module.get<QuestionManServiceService>(QuestionManServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
