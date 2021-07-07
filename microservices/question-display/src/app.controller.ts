import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('questions')
  getQuestions(@Query('start') start:number, @Query('end') end:number) {
    return this.appService.getQuestions(start, end);
  }
  
  @Get('question/:id')
  displayQuestion(@Param('id') id:string) {
    return this.appService.displayQuestion(+id);
  }
}
