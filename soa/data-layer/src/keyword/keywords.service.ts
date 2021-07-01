import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from "./entities/keyword.entity";
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import { Question } from "src/question/entities/question.entity";
import { QuestionService } from "src/question/question.service";
@Injectable()
export class KeywordsService {

  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const keyword = await this.manager.create(Keyword, createKeywordDto);
    return this.manager.save(keyword);
  }

  async findAll(): Promise<Keyword[]> {
    return this.manager.find(Keyword);
  }

  async findOne(id: number): Promise<Keyword> {
    const keyword = await this.manager.findOne(Keyword, id);
    if (!keyword) throw new NotFoundException(`Keyword #${id} not found`);
    return keyword;
  }

  async update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<Keyword> {
    return this.manager.transaction(async manager => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword) throw new NotFoundException(`Keyword #${id} not found`);
      manager.merge(Keyword, keyword, updateKeywordDto);
      return manager.save(keyword);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword) throw new NotFoundException(`Keyword #${id} not found`);
      await manager.delete(Keyword, id);
    });
  }

  //other
  async findOneByName(name:string): Promise<any> {
    const keyword = await this.manager.findOne(Keyword,{name:name});
    if (!keyword) 
      return {};
    else
      return keyword;
  }

  async findQuestionsPerKeyword(params,name:string): Promise<any> {
    let relations = [];
    if(params.questions) { relations.push('questions'); relations.push('questions.question'); }
    if(params.questionsKeywords) { relations.push('questions.question.keywords'); relations.push('questions.question.keywords.keyword'); }
    if(params.questionsUser) { relations.push('questions.question.user'); }
    if(params.questionsAnswers) { relations.push('questions.question.answers'); }
    const questions = await this.manager.findOne(Keyword,{name:name} ,{relations : relations});
    if(!questions)
      return {};
    else  
      return questions;
  }

  async findQuestionsPerKeywordsStats(params): Promise<any> {
    let relations = [];
    if(params.questions) { relations.push('questions'); relations.push('questions.question'); }
    if(params.questionsKeywords) { relations.push('questions.question.keywords'); relations.push('questions.question.keywords.keyword'); }
    if(params.questionsUser) { relations.push('questions.question.user'); }
    if(params.questionsAnswers) { relations.push('questions.question.answers'); }
    const keywords = await this.manager.find(Keyword,{relations : relations});
    if(!keywords)
      return {};
    else  
      return keywords;
  }
}