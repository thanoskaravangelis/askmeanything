import { Test, TestingModule } from '@nestjs/testing';
import { QuestionManServiceController } from './question-man-service.controller';
import { QuestionManServiceService } from './question-man-service.service';

describe('QuestionManServiceController', () => {
  let controller: QuestionManServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionManServiceController],
      providers: [QuestionManServiceService],
    }).compile();

    controller = module.get<QuestionManServiceController>(QuestionManServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
