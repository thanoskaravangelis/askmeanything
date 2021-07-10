import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { paginate, verify } from './general/gen_functions';
import { CreateKeywordDto } from './keyword/dto/create-keyword.dto';
import { KeywordsService } from './keyword/keywords.service';
import { CreateQuestionHasKeywordDto } from './question-has-keyword/dto/create-question-has-keyword.dto';
import { QuestionHasKeywordsService } from './question-has-keyword/question-has-keywords.service';
import { CreateQuestionDto } from './question/dto/create-question.dto';
import { UpdateQuestionDto } from './question/dto/update-question.dto';
import { QuestionService } from './question/question.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
    constructor(private readonly questionService: QuestionService ,
        private readonly usersService : UsersService,
        private readonly keywordService : KeywordsService,
        private readonly questionHasKeywordService : QuestionHasKeywordsService)
        {}
  
  getKeywords(start,end){
    return paginate(this.keywordService.findAll() ,{'start':start,'end': end});
  }

  async createKeyword(headers:any,body: CreateKeywordDto) {
      let id : number = await verify(headers);

      const requestUrl = 'keywords';
      let name = body.name;
      let resp = await this.keywordService.findOneByName(name);
      if(resp.name)
          return resp;
      else {
          const keyword = await this.keywordService.create(body); 
          return keyword;
      }
  }

  async editQuestion(headers:any, body: UpdateQuestionDto, questId:number) {
      let id :number = await verify(headers);

      const params = { 'id' : questId, 'user' : true };
      const question = await this.questionService.findOne(params);
      
      if(id==question.user.id) {
          console.log(`User with id ${id} has the right to edit the question.`);
          const question = this.questionService.update(questId,body);
          return question;
      }
      else {
          throw new UnauthorizedException("Unauthorized action.")
      }
  }

  async createQuestion(headers:any, body : CreateQuestionDto) {
      console.log(headers);
      let id:number = await verify(headers);

      if(id===body.user.id) {
          const question = await this.questionService.create(body);
          return question;
      }
      else {
          throw new UnauthorizedException("Unauthorized action.");
      }
  }

  async deleteQuestion(headers:any, questId:number) {
      let id:number = await verify(headers);

      const params = { 'id' : questId, 'user' : true };
      const question = await this.questionService.findOne(params);

      if(id==question.user.id) {
          console.log(`User with id ${id} has the right to delete the question.`);
          const deleted = this.questionService.remove(questId);
          return deleted;
      }
      else {
          throw new UnauthorizedException("Unauthorized action.")
      }
  }

  async createQuestionHasKeyword(headers:any, body: CreateQuestionHasKeywordDto) {
      let id : number = await verify(headers);
      const keyword = this.questionHasKeywordService.create(body);
      return keyword;
  }

  async removeQuestionKeyword(headers:any, relationId:number) {
      let id : number = await verify(headers);
      const keyword = this.questionHasKeywordService.remove(relationId);
      return keyword;
  }

  choreo(body:any) {
    const servicesList = {
      'user' : this.usersService,
      'question' : this.questionService,
      'keyword' : this.keywordService,
      'question-has-keyword' : this.questionHasKeywordService
    }
    let entity = body.entity;
    let method = body.method;
    let newBody = body.req_data;
    let id = body.id;

    console.log({
      'method' : method,
      'entity' : entity,
      'toEntity' : servicesList[entity]
    });

    if(entity === 'user'){
      newBody = {
        'username' : body.req_data.username
      }
    }

    if(method === 'post') {
      return servicesList[entity].create(newBody);
    }
    if(method === 'patch') {
      return servicesList[entity].update(id,newBody)
    }
    if(method === 'delete') {
      return servicesList[entity].remove(id);
    }
  }
}
