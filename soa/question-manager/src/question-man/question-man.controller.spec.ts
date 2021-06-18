import { Test, TestingModule } from '@nestjs/testing';
import { QuestionManController } from './question-man.controller';
import { QuestionManService } from './question-man.service';

describe('QuestionManController', () => {
  let controller: QuestionManController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionManController],
      providers: [QuestionManService],
    }).compile();

    controller = module.get<QuestionManController>(QuestionManController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
