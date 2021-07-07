import { Body, Controller, Delete, Request, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateAnswerDto } from './answer/dto/create-answer.dto';
import { UpdateAnswerDto } from './answer/dto/update-answer.dto';
import { AppService } from './app.service';
import { CreateUserAnswerVoteDto } from './user-answer-vote/dto/create-user-answer-vote.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('newanswer')
  createAnswer(@Body() body :CreateAnswerDto, @Request() req:any) {
    return this.appService.createAnswer(req.headers,body);
  }

  @Patch('editanswer/:id')
  editAnswer(@Body() body: UpdateAnswerDto, @Param('id') id:string, @Request() req:any) {
    return this.appService.editAnswer(req.headers,body,+id)
  }

  @Delete('deleteanswer/:id')
  deleteAnswer(@Param('id') id:string,@Request() req:any) {
    return this.appService.deleteAnswer(req.headers,+id);
  }

  @Post('newvote')
  createVote(@Body() body: CreateUserAnswerVoteDto,@Request() req:any) {
    return this.appService.vote(req.headers,body);
  }

  @Delete('deletevote/:id')
  deleteVote(@Param('id') id :string ,@Request() req:any) {
    return this.appService.removeVote(req.headers,+id);
  }
}
