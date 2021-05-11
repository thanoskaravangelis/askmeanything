import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerVoteController } from './user-answer-vote.controller';
import { UserAnswerVoteService } from './user-answer-vote.service';

describe('UserAnswerVoteController', () => {
  let controller: UserAnswerVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswerVoteController],
      providers: [UserAnswerVoteService],
    }).compile();

    controller = module.get<UserAnswerVoteController>(UserAnswerVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
