import { Module } from '@nestjs/common';
import { UserAnswerVoteService } from './user-answer-vote.service';
import { UserAnswerVoteController } from './user-answer-vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswerVote } from './entities/user-answer-vote.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserAnswerVote])],
  controllers: [UserAnswerVoteController],
  providers: [UserAnswerVoteService],
  exports :[UserAnswerVoteService]
})
export class UserAnswerVoteModule {}
