import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordsModule } from './keyword/keywords.module';
import { QuestionHasKeywordsModule } from './question-has-keyword/question-has-keywords.module';
import { QuestionModule } from './question/question.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule, QuestionModule, QuestionHasKeywordsModule, KeywordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
