import { Controller, Get, Post, Body, Patch, Delete, Param, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { start } from 'repl';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query() params:any) {
    return this.questionService.findAll(params);
  }

  @Get('one')
  findOne(@Query() params: any) {
    return this.questionService.findOne(params);
  }

  @Get('daily/stats')
  getQuestDaily() {
    return this.questionService.getQuestionsPerDay();
  }

  @Get('monthly/stats')
  getQuestMonthly() {
    return this.questionService.getQuestionsPerMonth();
  }

  @Get('monthly/analytics/:year/:month')
  getQuestMonthlyAnalytics(@Param('month') month:string, @Param('year') year:string) {
    return this.questionService.getQuestionsPerMonthAnalytics(month, year);
  }

  @Get('from/:startDate/to/:endDate')
  getQuestInDateSpan(@Param('startDate') startDate: string,@Param('endDate') endDate : string) {
    return this.questionService.getQuestionsInDateSpan(startDate, endDate)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
