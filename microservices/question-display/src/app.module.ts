import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordsModule } from './keyword/keywords.module';
import { QuestionHasKeywordsModule } from './question-has-keyword/question-has-keywords.module';
import { QuestionModule } from './question/question.module';
import { UserAnswerVote } from './user-answer-vote/entities/user-answer-vote.entity';
import { UserAnswerVoteModule } from './user-answer-vote/user-answer-vote.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [QuestionModule, KeywordsModule, UserAnswerVoteModule, AnswerModule, UsersModule, QuestionHasKeywordsModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
