import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswerVoteDto } from './create-user-answer-vote.dto';

export class UpdateUserAnswerVoteDto extends PartialType(CreateUserAnswerVoteDto) {}
