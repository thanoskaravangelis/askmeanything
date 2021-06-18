import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRunController } from './question-run.controller';
import { QuestionRunService } from './question-run.service';

describe('QuestionRunController', () => {
  let controller: QuestionRunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionRunController],
      providers: [QuestionRunService],
    }).compile();

    controller = module.get<QuestionRunController>(QuestionRunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
