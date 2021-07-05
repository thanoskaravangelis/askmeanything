import { Body, Controller, Delete, Get, Param, Request, Patch, Post } from '@nestjs/common';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { CreateUserAnswerVoteDto } from 'src/user-answer-vote/dto/create-user-answer-vote.dto';
import { QuestionRunService } from './question-run.service';

@Controller('question-run')
export class QuestionRunController {
  constructor(private readonly questionRunService: QuestionRunService) {}

  @Post('newanswer')
  createAnswer(@Body() body :CreateAnswerDto, @Request() req:any) {
    return this.questionRunService.createAnswer(req.headers,body);
  }

  @Patch('editanswer/:id')
  editAnswer(@Body() body: UpdateAnswerDto, @Param('id') id:string, @Request() req:any) {
    return this.questionRunService.editAnswer(req.headers,body,+id)
  }

  @Delete('deleteanswer/:id')
  deleteAnswer(@Param('id') id:string,@Request() req:any) {
    return this.questionRunService.deleteAnswer(req.headers,+id);
  }

  @Post('newvote')
  createVote(@Body() body: CreateUserAnswerVoteDto,@Request() req:any) {
    return this.questionRunService.vote(req.headers,body);
  }

  @Delete('deletevote/:id')
  deleteVote(@Param('id') id :string ,@Request() req:any) {
    return this.questionRunService.removeVote(req.headers,+id);
  }
}
