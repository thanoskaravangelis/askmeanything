import { Test, TestingModule } from '@nestjs/testing';
import { QuestionHasKeywordsService } from './question-has-keywords.service';

describe('QuestionHasKeywordsService', () => {
  let service: QuestionHasKeywordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionHasKeywordsService],
    }).compile();

    service = module.get<QuestionHasKeywordsService>(QuestionHasKeywordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
