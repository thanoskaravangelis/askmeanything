import { Test, TestingModule } from '@nestjs/testing';
import { QuestionManService } from './question-man.service';

describe('QuestionManService', () => {
  let service: QuestionManService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionManService],
    }).compile();

    service = module.get<QuestionManService>(QuestionManService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
