import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRunServiceController } from './question-run-service.controller';
import { QuestionRunServiceService } from './question-run-service.service';

describe('QuestionRunServiceController', () => {
  let controller: QuestionRunServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionRunServiceController],
      providers: [QuestionRunServiceService],
    }).compile();

    controller = module.get<QuestionRunServiceController>(QuestionRunServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
