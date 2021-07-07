import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionHasKeywordsService } from './question-has-keywords.service';
import { CreateQuestionHasKeywordDto } from './dto/create-question-has-keyword.dto';
import { UpdateQuestionHasKeywordDto } from './dto/update-question-has-keyword.dto';

@Controller('question-has-keyword')
export class QuestionHasKeywordsController {
  constructor(private readonly questionHasKeywordsService: QuestionHasKeywordsService) {}

  @Post()
  create(@Body() createQuestionHasKeywordDto: CreateQuestionHasKeywordDto) {
    return this.questionHasKeywordsService.create(createQuestionHasKeywordDto);
  }

  @Get()
  findAll() {
    return this.questionHasKeywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionHasKeywordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionHasKeywordDto: UpdateQuestionHasKeywordDto) {
    return this.questionHasKeywordsService.update(+id, updateQuestionHasKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionHasKeywordsService.remove(+id);
  }
}
