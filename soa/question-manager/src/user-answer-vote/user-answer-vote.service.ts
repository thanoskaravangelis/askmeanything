import { Injectable } from '@nestjs/common';
import { CreateUserAnswerVoteDto } from './dto/create-user-answer-vote.dto';
import { UpdateUserAnswerVoteDto } from './dto/update-user-answer-vote.dto';

@Injectable()
export class UserAnswerVoteService {
  create(createUserAnswerVoteDto: CreateUserAnswerVoteDto) {
    return 'This action adds a new userAnswerVote';
  }

  findAll() {
    return `This action returns all userAnswerVote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswerVote`;
  }

  update(id: number, updateUserAnswerVoteDto: UpdateUserAnswerVoteDto) {
    return `This action updates a #${id} userAnswerVote`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerVote`;
  }
}
