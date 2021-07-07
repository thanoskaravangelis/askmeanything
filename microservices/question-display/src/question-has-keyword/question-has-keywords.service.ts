import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionHasKeywordDto } from './dto/create-question-has-keyword.dto';
import { UpdateQuestionHasKeywordDto } from './dto/update-question-has-keyword.dto';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import {QuestionHasKeyword} from "./entities/question-has-keyword.entity";

@Injectable()
export class QuestionHasKeywordsService {
  constructor(@InjectEntityManager() private manager : EntityManager) {}

  async create(createQuestionHasKeywordDto: CreateQuestionHasKeywordDto) : Promise<QuestionHasKeyword> {
    const question_keyword = this.manager.create(QuestionHasKeyword,createQuestionHasKeywordDto);
    return this.manager.save(question_keyword);
  }

  async findAll() : Promise<QuestionHasKeyword[]> {
    return this.manager.find(QuestionHasKeyword);
  }

  async findOne(id: number) : Promise<QuestionHasKeyword> {
    const question_keyword = await this.manager.findOne(QuestionHasKeyword, id);
    if(!question_keyword) throw new NotFoundException(`Question-keyword relationship with id #${id} not found`);
    return question_keyword;
  }

  async update(id: number, updateQuestionHasKeywordDto: UpdateQuestionHasKeywordDto) : Promise<QuestionHasKeyword> {
    return this.manager.transaction(async manager => {
      const question_keyword = await manager.findOne(QuestionHasKeyword, id);
      if (!question_keyword) throw new NotFoundException(`Question-keyword relationship with #${id} not found`);
      manager.merge(QuestionHasKeyword, question_keyword, updateQuestionHasKeywordDto);
      return manager.save(question_keyword);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const question_keyword = await manager.findOne(QuestionHasKeyword, id);
      if (!question_keyword) throw new NotFoundException(`Question-keyword relationship with id  #${id} not found`);
      await manager.delete(QuestionHasKeyword, id);
    });
  }
}
