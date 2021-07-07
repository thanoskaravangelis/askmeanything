import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer/answer.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordsService } from './keyword/keywords.service';
import { QuestionHasKeywordsService } from './question-has-keyword/question-has-keywords.service';
import { QuestionService } from './question/question.service';
import { UserAnswerVoteService } from './user-answer-vote/user-answer-vote.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersService,QuestionService,AnswerService,UserAnswerVoteService,QuestionHasKeywordsService,KeywordsService,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
