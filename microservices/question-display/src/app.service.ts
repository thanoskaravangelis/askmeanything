import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AnswerService } from './answer/answer.service';
import { paginate } from './general/gen_functions';
import { KeywordsService } from './keyword/keywords.service';
import { QuestionHasKeywordsService } from './question-has-keyword/question-has-keywords.service';
import { QuestionService } from './question/question.service';
import { UserAnswerVoteService } from './user-answer-vote/user-answer-vote.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  
  constructor(private readonly questionService: QuestionService ,
     private readonly usersService : UsersService,
     private readonly answerService : AnswerService,
     private readonly keywordService : KeywordsService,
     private readonly userAnswerVote : UserAnswerVoteService,
     private readonly questionHasKeywordService : QuestionHasKeywordsService){}

  getQuestions(start, end) {
    const requestUrl = 'question';
    const params = {
        user: true,
        keywords : true,
        answers:true,
    };
    return  paginate(this.questionService.findAll(params) ,{'start':start,'end': end});
  }
   

  displayQuestion(id : number) {
      const requestUrl = `question/one`;
      const params = {
          user:true, 
          id: id,
          keywords : true,
          answers: true,
          answersUser:true,
          answersUpvotes:true,
      };
      return this.questionService.findOne(params);
  }

  choreo(body:any) {
    const servicesList = {
      'user' : this.usersService,
      'question' : this.questionService,
      'answer' : this.answerService,
      'keyword' : this.keywordService,
      'question-has-keyword' : this.questionHasKeywordService,
      'vote' : this.userAnswerVote
    }

    let entity = body.entity;
    let method = body.method;
    let newBody = body.req_data;
    let id = body.id;

    if(entity === 'user'){
      newBody = {
        'username' : body.req_data.username
      }
    }

    console.log({
      'method' : method,
      'entity' : entity,
      'toEntity' : servicesList[entity]
    });
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
