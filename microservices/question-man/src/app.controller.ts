import { Body, Controller, Delete, Get, Param, Request, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateKeywordDto } from './keyword/dto/create-keyword.dto';
import { CreateQuestionHasKeywordDto } from './question-has-keyword/dto/create-question-has-keyword.dto';
import { CreateQuestionDto } from './question/dto/create-question.dto';
import { UpdateQuestionDto } from './question/dto/update-question.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('keywords')
  getKeywords(@Query('start') start:number, @Query('end') end:number) {
    return this.appService.getKeywords(start, end);
  }

  @Post('newkeyword')
  createKeyword(@Body() body: CreateKeywordDto, @Request() req:any) {
    return this.appService.createKeyword(req.headers,body);
  }

  @Post('newquestion')
  createQuestion(@Body() body: CreateQuestionDto, @Request() req:any) {
    return this.appService.createQuestion(req.headers,body);
  }

  @Post('newquestionhaskeyword')
  createQuestionHasKeyword(@Body() body: CreateQuestionHasKeywordDto, @Request() req:any){
    return this.appService.createQuestionHasKeyword(req.headers, body);
  }


  @Patch('editquestion/:id')
  editQuestion(@Body() body:UpdateQuestionDto, @Request() req:any,@Param('id') id:string) {
    return this.appService.editQuestion(req.headers,body,+id);
  }

  @Delete('deletequestion/:id')
  deleteQuestion(@Param('id') id:string,@Request() req:any) {
    return this.appService.deleteQuestion(req.headers,+id);
  }

  @Delete('removekeywordquestion/:id')
  deleteQuestionHasKeyword(@Param('id') id:string, @Request() req:any) {
    return this.appService.removeQuestionKeyword(req.headers,+id);
  }
}
