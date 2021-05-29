import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRunServiceService } from './question-run-service.service';

describe('QuestionRunServiceService', () => {
  let service: QuestionRunServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionRunServiceService],
    }).compile();

    service = module.get<QuestionRunServiceService>(QuestionRunServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
