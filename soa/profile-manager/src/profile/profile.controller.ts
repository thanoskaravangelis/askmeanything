import { Controller, Body, Patch, Param, Request, Get } from "@nestjs/common";
import { ProfileService } from './profile.service';
import axios from "axios";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

axios.defaults.baseURL = 'http://localhost:3030';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  getUser(@Param('id') id:string) {
    return this.profileService.getProfile(+id);
  }

  @Patch(':id/edit')
  updateUser(@Param('id') id: string, @Body() body:UpdateUserDto,@Request() req:any ) {
    return this.profileService.updateUser(req.headers, +id, body);
  }

  @Get(':id/myquestions')
  getMyQuestions(@Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyQuestions(req.headers,+id);
  }

  @Get(':id/myanswers')
  getMyAnswers(@Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyAnswers(req.headers, +id);
  }

  @Get(':id/mystats')
  getMyStats(@Param('id') id: string,@Request() req:any) {
    return this.profileService.getMyStats(req.headers, +id);
  }

  @Get('questionsperkeyword/:name')
  getQuestionsPerKeyword(@Param('name') name:string) {
    return this.profileService.getQuestionsPerKeyword(name);
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
  getQuestionsMonthlyAnalytics(@Param('year') year:string,@Param('month') month:string) {
    return this.profileService.getQuestionPerMonthAnalytics(month,year);
  }

  @Get('questions/from/:startDate/to/:endDate')
  getQuestionsSpan(@Param('startDate') startDate:string, @Param('endDate') endDate:string) {
    return this.profileService.getQuestInDateSpan(startDate,endDate);
  }
}
