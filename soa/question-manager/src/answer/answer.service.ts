import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {Answer} from "./entities/answer.entity";
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager : EntityManager) {}

  async create(createAnswerDto: CreateAnswerDto):Promise<Answer> {
    const answer = await this.manager.create(Answer, createAnswerDto);
    return this.manager.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return this.manager.find(Answer);
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.manager.findOne(Answer,id);
    if(!answer) throw new NotFoundException(`Answer #${id} not found`);
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async manager => {
      const answer = await manager.findOne(Answer,id);
      if(!answer) throw new NotFoundException(`Answer #${id} not found`);
      manager.merge(Answer, answer, updateAnswerDto);
      return manager.save(answer);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const answer = await manager.findOne(Answer,id);
      if(!answer) throw new NotFoundException(`Answer #${id} not found`);
      await manager.delete(Answer, id);
    });
  }
}
