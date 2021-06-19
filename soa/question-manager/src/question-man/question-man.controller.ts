import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateKeywordDto } from 'src/keyword/dto/create-keyword.dto';
import { CreateQuestionHasKeywordDto } from 'src/question-has-keyword/dto/create-question-has-keyword.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { QuestionManService } from './question-man.service';

@Controller('question-man')
export class QuestionManController {
  constructor(private readonly questionManService: QuestionManService) {}

  @Get('questions')
  getQuestions(@Query('start') start:number, @Query('end') end:number) {
    return this.questionManService.getQuestions(start, end);
  }

  @Get('question/:id')
  displayQuestion(@Param('id') id:string) {
    return this.questionManService.displayQuestion(+id);
  }

  @Post('newkeyword')
  createKeyword(@Body() body: CreateKeywordDto) {
    return this.questionManService.createKeyword(body);
  }

  @Post('newquestion')
  createQuestion(@Body() body: CreateQuestionDto) {
    return this.questionManService.createQuestion(body);
  }

  @Post('newquestionhaskeyword')
  createQuestionHasKeyword(@Body() body: CreateQuestionHasKeywordDto){
    return this.questionManService.createQuestionHasKeyword(body);
  }
}
