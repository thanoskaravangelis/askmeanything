import { Module } from '@nestjs/common';
import { QuestionHasKeywordsService } from './question-has-keywords.service';
import { QuestionHasKeywordsController } from './question-has-keywords.controller';

@Module({
  controllers: [QuestionHasKeywordsController],
  providers: [QuestionHasKeywordsService]
})
export class QuestionHasKeywordsModule {}
