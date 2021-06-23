import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { CreateUserAnswerVoteDto } from 'src/user-answer-vote/dto/create-user-answer-vote.dto';
import { QuestionRunService } from './question-run.service';

@Controller('question-run')
export class QuestionRunController {
  constructor(private readonly questionRunService: QuestionRunService) {}

  @Post('newanswer')
  createAnswer(@Body() body :CreateAnswerDto) {
    return this.questionRunService.createAnswer(body);
  }

  @Patch('editanswer/:id')
  editAnswer(@Body() body: UpdateAnswerDto, @Param('id') id:string) {
    return this.questionRunService.editAnswer(body,+id)
  }

  @Delete('deleteanswer/:id')
  deleteAnswer(@Param('id') id:string) {
    return this.questionRunService.deleteAnswer(+id);
  }

  @Post('newvote')
  createVote(@Body() body: CreateUserAnswerVoteDto) {
    return this.questionRunService.vote(body);
  }

  @Delete('deletevote')
  deleteVote(@Param('id') id :string ) {
    return this.questionRunService.removeVote(+id);
  }
}
