import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserAnswerVoteDto } from './dto/create-user-answer-vote.dto';
import { UpdateUserAnswerVoteDto } from './dto/update-user-answer-vote.dto';
import {UserAnswerVote} from "./entities/user-answer-vote.entity";
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";

@Injectable()
export class UserAnswerVoteService {
  constructor(@InjectEntityManager() private manager : EntityManager) {}

  async create(createUserAnswerVoteDto: CreateUserAnswerVoteDto): Promise<UserAnswerVote> {
    const vote = this.manager.create(UserAnswerVote,createUserAnswerVoteDto);
    return this.manager.save(vote);
  }

  async findAll(): Promise<UserAnswerVote[]> {
    return this.manager.find(UserAnswerVote);
  }

  async findOne(id: number): Promise<UserAnswerVote> {
    const vote = await this.manager.findOne(UserAnswerVote, id);
    if(!vote) throw new NotFoundException(`Vote #${id} not found`);
    return vote;
  }

  async update(id: number, updateUserAnswerVoteDto: UpdateUserAnswerVoteDto):Promise<UserAnswerVote> {
    return this.manager.transaction(async manager => {
      const vote = await manager.findOne(UserAnswerVote, id);
      if (!vote) throw new NotFoundException(`Vote #${id} not found`);
      manager.merge(UserAnswerVote, vote, updateUserAnswerVoteDto);
      return manager.save(vote);
    });
  }


  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const vote = await manager.findOne(UserAnswerVote, id);
      if (!vote) throw new NotFoundException(`Vote #${id} not found`);
      await manager.delete(UserAnswerVote, id);
    });
  }

}
