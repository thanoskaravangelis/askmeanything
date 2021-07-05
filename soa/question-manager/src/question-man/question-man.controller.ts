import { Body, Controller, Get, Param, Post, Headers, Request, Query, Patch, Delete } from '@nestjs/common';
import { CreateKeywordDto } from 'src/keyword/dto/create-keyword.dto';
import { CreateQuestionHasKeywordDto } from 'src/question-has-keyword/dto/create-question-has-keyword.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { QuestionManService } from './question-man.service';

@Controller('question-man')
export class QuestionManController {
  constructor(private readonly questionManService: QuestionManService) {}

  @Get('questions')
  getQuestions(@Query('start') start:number, @Query('end') end:number) {
    return this.questionManService.getQuestions(start, end);
  }

  @Get('keywords')
  getKeywords(@Query('start') start:number, @Query('end') end:number) {
    return this.questionManService.getKeywords(start, end);
  }
  
  @Get('question/:id')
  displayQuestion(@Param('id') id:string) {
    return this.questionManService.displayQuestion(+id);
  }

  @Post('newkeyword')
  createKeyword(@Body() body: CreateKeywordDto, @Request() req:any) {
    return this.questionManService.createKeyword(req.headers,body);
  }

  @Post('newquestion')
  createQuestion(@Body() body: CreateQuestionDto, @Request() req:any) {
    return this.questionManService.createQuestion(req.headers,body);
  }

  @Post('newquestionhaskeyword')
  createQuestionHasKeyword(@Body() body: CreateQuestionHasKeywordDto, @Request() req:any){
    return this.questionManService.createQuestionHasKeyword(req.headers, body);
  }

  @Patch('editquestion/:id')
  editQuestion(@Body() body:UpdateQuestionDto, @Request() req:any,@Param('id') id:string) {
    return this.questionManService.editQuestion(req.headers,body,+id);
  }

  @Delete('deletequestion/:id')
  deleteQuestion(@Param('id') id:string,@Request() req:any) {
    return this.questionManService.deleteQuestion(req.headers,+id);
  }


}
