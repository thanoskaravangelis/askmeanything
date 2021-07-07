import { Controller, Get, Param, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get(':id/myquestions')
  getMyQuestions(@Param('id') id: string,@Request() req:any) {
    return this.appService.getMyQuestions(req.headers,+id);
  }

  @Get(':id/myanswers')
  getMyAnswers(@Param('id') id: string,@Request() req:any) {
    return this.appService.getMyAnswers(req.headers, +id);
  }

  @Get(':id/mystats')
  getMyStats(@Param('id') id: string,@Request() req:any) {
    return this.appService.getMyStats(req.headers, +id);
  }

  @Get('questionsperkeyword/:name')
  getQuestionsPerKeyword(@Param('name') name:string) {
    return this.appService.getQuestionsPerKeyword(name);
  }

  @Get('questions/perkeyword/stats')
  getQuestionsPerKeywordStats() {
    return this.appService.getQuestionsPerKeywordStats();
  }

  @Get('questions/daily/stats')
  getQuestionsDaily() {
    return this.appService.getQuestionsPerDay();
  }

  @Get('questions/monthly/stats')
  getQuestionsMonthly() {
    return this.appService.getQuestionsPerMonth();
  }

  @Get('answers/daily/stats')
  getAnswersDaily() {
    return this.appService.getAnswersPerDay();
  }

  @Get('answers/monthly/stats')
  getAnswersMonthly() {
    return this.appService.getAnswersPerMonth();
  }

  @Get('questions/monthly/analytics/:year/:month')
  getQuestionsMonthlyAnalytics(@Param('year') year:string,@Param('month') month:string) {
    return this.appService.getQuestionPerMonthAnalytics(month,year);
  }

  @Get('questions/from/:startDate/to/:endDate')
  getQuestionsSpan(@Param('startDate') startDate:string, @Param('endDate') endDate:string) {
    return this.appService.getQuestInDateSpan(startDate,endDate);
  }
}
