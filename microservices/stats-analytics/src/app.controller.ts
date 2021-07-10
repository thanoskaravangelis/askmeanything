import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get(':id/myquestions')
  getMyQuestions(@Param('id') id: string,@Request() req:any,@Query('start') start:number,@Query('end') end:number) {
    return this.appService.getMyQuestions(start,end,req.headers,+id);
  }

  @Get(':id/myanswered')
  getMyAnswered(@Param('id') id: string,@Request() req:any,@Query('start') start:number,@Query('end') end:number) {
    return this.appService.getMyAnswered(start,end,req.headers, +id);
  }

  @Get(':id/mystats')
  getMyStats(@Param('id') id: string,@Request() req:any) {
    return this.appService.getMyStats(req.headers, +id);
  }

  @Get('questionsperkeyword/:name')
  getQuestionsPerKeyword(@Param('name') name:string,@Query('start') start:number,@Query('end') end:number) {
    return this.appService.getQuestionsPerKeyword(start,end,name);
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
  getQuestionsMonthlyAnalytics(@Param('year') year:string,@Param('month') month:string,@Query('start') start:number,@Query('end') end:number) {
    return this.appService.getQuestionPerMonthAnalytics(start,end,month,year);
  }

  @Get('questions/from/:startDate/to/:endDate')
  getQuestionsSpan(@Param('startDate') startDate:string, @Param('endDate') endDate:string,@Query('start') start:number,@Query('end') end:number) {
    return this.appService.getQuestInDateSpan(start,end,startDate,endDate);
  }
}
