import { Module } from '@nestjs/common';
import { QuestionHasKeywordsService } from './question-has-keywords.service';
import { QuestionHasKeywordsController } from './question-has-keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionHasKeyword } from './entities/question-has-keyword.entity';

@Module({
  imports:[TypeOrmModule.forFeature([QuestionHasKeyword])],
  controllers: [QuestionHasKeywordsController],
  providers: [QuestionHasKeywordsService],
  exports :[QuestionHasKeywordsService]
})
export class QuestionHasKeywordsModule {}
