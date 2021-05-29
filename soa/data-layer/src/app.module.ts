import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerModule } from './answer/answer.module';
import { UserAnswerVoteModule } from './user-answer-vote/user-answer-vote.module';
import { KeywordsModule } from './keyword/keywords.module';
import { QuestionHasKeywordsModule } from './question-has-keyword/question-has-keywords.module';

@Module({
  imports: [UsersModule, QuestionModule,TypeOrmModule.forRoot(), AnswerModule, UserAnswerVoteModule, KeywordsModule, QuestionHasKeywordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
