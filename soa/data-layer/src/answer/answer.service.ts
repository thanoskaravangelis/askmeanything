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

  async findAll(params): Promise<Answer[]> {
    let relations = [];
    if(params.user) { relations.push('user'); }
    if(params.question) { relations.push('question'); }
    if(params.votes) { relations.push('votes'); }
    return this.manager.find(Answer);
  }

  async findOne(params): Promise<Answer> {
    let relations = [];
    let id;
    if(params.user) { relations.push('user'); }
    if(params.id) { id = params.id; }
    if(params.question) { relations.push('question'); }
    if(params.votes) { relations.push('votes'); }
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

  //other

  getAnswersPerDay(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."answer"."createdAt",'FMDay') as day,COUNT(*) as answers
      FROM public."answer"
      GROUP BY day`
    );
  }

  getAnswersPerMonth(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."answer"."createdAt",'YYYY-MM') as month,COUNT(*) as answers
      FROM public."answer"
      GROUP BY month`
    );
  }

}
