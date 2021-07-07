import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnswerVoteService } from './user-answer-vote.service';
import { CreateUserAnswerVoteDto } from './dto/create-user-answer-vote.dto';
import { UpdateUserAnswerVoteDto } from './dto/update-user-answer-vote.dto';

@Controller('user-answer-vote')
export class UserAnswerVoteController {
  constructor(private readonly userAnswerVoteService: UserAnswerVoteService) {}

  @Post()
  create(@Body() createUserAnswerVoteDto: CreateUserAnswerVoteDto) {
    return this.userAnswerVoteService.create(createUserAnswerVoteDto);
  }

  @Get()
  findAll() {
    return this.userAnswerVoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerVoteService.findOne(+id);
  }

  @Get('onebyIds/:userId/:answerId')
  findOneByIds(@Param('userId') userId : string, @Param('answerId') answerId : string) {
    return this.userAnswerVoteService.findVoteByUserAndAnswer(+userId,+answerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAnswerVoteDto: UpdateUserAnswerVoteDto) {
    return this.userAnswerVoteService.update(+id, updateUserAnswerVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerVoteService.remove(+id);
  }
}
