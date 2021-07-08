import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {Question} from "./entities/question.entity";
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Raw} from "typeorm";

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = await this.manager.create(Question, createQuestionDto);
    return this.manager.save(question);
  }

  async findAll(params): Promise<Question[]> {
    let relations = [];
    if(params.user) { relations.push('user'); }
    if(params.answers) { relations.push('answers'); relations.push('answers.user');}
    if(params.keywords) { relations.push('keywords'); relations.push('keywords.keyword');}
    return this.manager.find(Question,{relations : relations});
  }

  async findOne(params): Promise<Question> {
    let relations = [];
    let id;
    if(params.user) { relations.push('user'); }
    if(params.id) { id = params.id; }
    if(params.answers) { relations.push('answers'); relations.push('answers.user'); }
    if(params.answersUpvotes) { relations.push('answers.votes'); }
    if(params.keywords) { relations.push('keywords'); relations.push('keywords.keyword');}
    const question = await this.manager.findOne(Question, id, {relations : relations});
    if (!question) throw new NotFoundException('Question ${id} not found.');
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException('Question ${id} not found');
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException('Question ${id} not found');
      await manager.delete(Question, id);
    });
  }

  //other
  getQuestionsPerDay(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."question"."createdAt",'FMDay') as day,COUNT(*) as questions
      FROM public."question"
      GROUP BY day`
    );
  }

  getQuestionsPerMonth(): Promise<any> {
    return this.manager.query(
      `SELECT to_char(public."question"."createdAt",'YYYY-MM') as month,COUNT(*) as questions
      FROM public."question"
      GROUP BY month`
    );
  }

  async getQuestionsPerMonthAnalytics(month:string,year:string): Promise<any> {
    
    const questions = await this.manager.find(Question, { relations : ['user', 'answers','keywords','keywords.keyword'] ,
    where : 
      { createdAt: Raw(alias =>`${alias} >= :date1 AND ${alias} <= :date2`, { date1 : year+'-'+month+'-01' , date2: year+'-'+month+'-31'}) }
    });
    
    if(!questions)  
      return {};
    else
      return questions;
  }

  async getQuestionsInDateSpan(startDate:string, endDate:string) : Promise<any> {
    const questions = await this.manager.find(Question, { relations : ['user', 'answers','keywords','keywords.keyword'] , 
    where : { createdAt: Raw(alias =>`${alias} >= :date1 AND ${alias} <= :date2`, { date1 : startDate , date2: endDate})  }
    });

    if(!questions)  
      return {};
    else
      return questions;
  }
}
