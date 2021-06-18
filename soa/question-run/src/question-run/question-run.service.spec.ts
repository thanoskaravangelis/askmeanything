import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRunService } from './question-run.service';

describe('QuestionRunService', () => {
  let service: QuestionRunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionRunService],
    }).compile();

    service = module.get<QuestionRunService>(QuestionRunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
