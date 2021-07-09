import { Controller, Body, Patch, Param, Request, Get, Delete, Query } from "@nestjs/common";
import { ProfileService } from './profile.service';
import axios from "axios";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

axios.defaults.baseURL = 'http://localhost:3030';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  getUser(@Param('id') id:string,@Request() req:any) {
    return this.profileService.getProfile(req.headers,+id);
  }

  @Patch(':id/edit')
  updateUser(@Param('id') id: string, @Body() body:UpdateUserDto,@Request() req:any ) {
    return this.profileService.updateUser(req.headers, +id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id:string,@Request() req:any){
    return this.profileService.deleteProfile(req.headers,+id);
  }

  @Get(':id/myquestions')
  getMyQuestions(@Query('start') start:number, @Query('start') end:number, @Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyQuestions(start,end,req.headers,+id);
  }

  @Get(':id/myanswered')
  getMyAnswers(@Query('start') start:number, @Query('start') end:number,@Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyAnswered(start,end,req.headers, +id);
  }

  @Get(':id/mystats')
  getMyStats(@Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyStats(req.headers, +id);
  }

  @Get('questionsperkeyword/:name')
  getQuestionsPerKeyword(@Query('start') start:number, @Query('start') end:number,@Param('name') name:string) {
    return this.profileService.getQuestionsPerKeyword(start,end,name);
  }

  @Get('questions/perkeyword/stats')
  getQuestionsPerKeywordStats() {
    return this.profileService.getQuestionsPerKeywordStats();
  }

  @Get('questions/daily/stats')
  getQuestionsDaily() {
    return this.profileService.getQuestionsPerDay();
  }

  @Get('questions/monthly/stats')
  getQuestionsMonthly() {
    return this.profileService.getQuestionsPerMonth();
  }

  @Get('answers/daily/stats')
  getAnswersDaily() {
    return this.profileService.getAnswersPerDay();
  }

  @Get('answers/monthly/stats')
  getAnswersMonthly() {
    return this.profileService.getAnswersPerMonth();
  }

  @Get('questions/monthly/analytics/:year/:month')
  getQuestionsMonthlyAnalytics(@Query('start') start:number, @Query('start') end:number,@Param('year') year:string,@Param('month') month:string) {
    return this.profileService.getQuestionPerMonthAnalytics(start,end,month,year);
  }

  @Get('questions/from/:startDate/to/:endDate')
  getQuestionsSpan(@Query('start') start:number, @Query('start') end:number,@Param('startDate') startDate:string, @Param('endDate') endDate:string) {
    return this.profileService.getQuestInDateSpan(start,end,startDate,endDate);
  }
}
