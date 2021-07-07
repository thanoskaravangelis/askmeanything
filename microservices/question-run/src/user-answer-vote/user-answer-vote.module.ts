import { Module } from '@nestjs/common';
import { UserAnswerVoteService } from './user-answer-vote.service';
import { UserAnswerVoteController } from './user-answer-vote.controller';

@Module({
  controllers: [UserAnswerVoteController],
  providers: [UserAnswerVoteService],
  exports: [UserAnswerVoteService]
})
export class UserAnswerVoteModule {}
