import { Controller, Body, Patch, Param, Get } from "@nestjs/common";
import { ProfileService } from './profile.service';
import axios from "axios";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

axios.defaults.baseURL = 'http://localhost:3030';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Patch(':id/edit')
  updateUser(@Param('id') id: string, body:UpdateUserDto ) {
    return this.profileService.updateUser(id, body);
  }

  @Get(':id/myquestions')
  getMyQuestions(@Param('id') id: string) {
    return this.profileService.getMyQuestions(id);
  }

  @Get(':id/myanswers')
  getMyAnswers(@Param('id') id: string) {
    return this.profileService.getMyAnswers(id);
  }

  @Get(':id/mystats')
  getMyStats(@Param('id') id: string) {
    return this.profileService.getMyStats(id);
  }

  @Get('questionsperkeyword/:name')
  getQuestionsPerKeyword(@Param('name') name:string) {
    return this.profileService.getQuestionsPerKeyword(name);
  }

  @Get('questionsperkeywordstats')
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
}
