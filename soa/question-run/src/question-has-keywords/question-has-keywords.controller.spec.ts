import { Test, TestingModule } from '@nestjs/testing';
import { QuestionHasKeywordsController } from './question-has-keywords.controller';
import { QuestionHasKeywordsService } from './question-has-keywords.service';

describe('QuestionHasKeywordsController', () => {
  let controller: QuestionHasKeywordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionHasKeywordsController],
      providers: [QuestionHasKeywordsService],
    }).compile();

    controller = module.get<QuestionHasKeywordsController>(QuestionHasKeywordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
