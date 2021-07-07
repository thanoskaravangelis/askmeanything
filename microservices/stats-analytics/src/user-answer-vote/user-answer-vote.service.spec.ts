import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerVoteService } from './user-answer-vote.service';

describe('UserAnswerVoteService', () => {
  let service: UserAnswerVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswerVoteService],
    }).compile();

    service = module.get<UserAnswerVoteService>(UserAnswerVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
