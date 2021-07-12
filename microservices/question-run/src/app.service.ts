import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { AnswerService } from './answer/answer.service';
import { CreateAnswerDto } from './answer/dto/create-answer.dto';
import { UpdateAnswerDto } from './answer/dto/update-answer.dto';
import { verify } from './general/gen_functions';
import { QuestionService } from './question/question.service';
import { CreateUserAnswerVoteDto } from './user-answer-vote/dto/create-user-answer-vote.dto';
import { UserAnswerVoteService } from './user-answer-vote/user-answer-vote.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
    constructor(private readonly questionService: QuestionService ,
        private readonly usersService : UsersService,
        private readonly answerService : AnswerService,
        private readonly userAnswerVoteService : UserAnswerVoteService){}

  async createAnswer(headers:any, body: CreateAnswerDto){
    let id : number = await verify(headers);

    if(body.user.id == id) {
        const answer = await this.answerService.create(body);
        if(!answer){
            throw new BadRequestException("Could not create new answer.")
        }
        return answer;
    }
    else {
        throw new UnauthorizedException("Unauthorized action.");
    }
}

async editAnswer(headers:any, body: UpdateAnswerDto, ansid: number) {
    let id : number = await verify(headers);
    
    const params = {
        id : ansid,
        user: true
    };
    let userId;
    const answerGet = await this.answerService.findOne(params);
    userId = answerGet.userId;
    if(!answerGet){
        throw new BadRequestException(`Could not fetch answer's data with id ${ansid}`)
    }
    
    if(userId == id) {
        console.log(body);
        const answer = await this.answerService.update(ansid,body);
        return answer;
    }
    else {
        throw new UnauthorizedException("Unauthorized action.");
    }
}

async deleteAnswer(headers:any, ansid:number) {
    let id : number = await verify(headers);

    const params = {
        id : ansid,
        user: true
    };
    let userId;
    const answerGet = await this.answerService.findOne(params);
    if(!answerGet){
        throw new BadRequestException(`Could not fetch answer's data with id ${ansid}`)
    }

    if (answerGet.userId == id) {
        const deleted = await this.answerService.remove(ansid);
        return deleted;
    }
    else {
        throw new UnauthorizedException("Unauthorized action.");
    }

}

async vote(headers:any, body: CreateUserAnswerVoteDto) {
    let id : number = await verify(headers);

    let userId, answerId,voteId,checkdata;
    let alrExists;
    if(body.user.id && body.answer.id) {
        userId = body.user.id;
        answerId = body.answer.id;
        const checkdata = await this.userAnswerVoteService.findVoteByUserAndAnswer(userId,answerId);
    }
    if(!checkdata) {
        const vote = await this.userAnswerVoteService.create(body);
        return vote;
    }
    else {
        voteId = checkdata.id;
        const deleted = await this.userAnswerVoteService.remove(voteId);
        const posted = await this.userAnswerVoteService.create(body);
        return posted;
    }
}

async removeVote(headers:any, voteid : number) {
    let id : number = await verify(headers);

    let userId;
    const thisVote = await this.userAnswerVoteService.findOne(voteid);
    userId = thisVote.userId;

    if(id == userId) {
        return this.userAnswerVoteService.remove(voteid);
    }
    else {
        throw new UnauthorizedException("Unauthorized action.");
    }
}

choreo(body:any) {
    const servicesList = {
        'user' : this.usersService,
        'question' : this.questionService,
        'answer' : this.answerService,
        'vote' : this.userAnswerVoteService
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

    if(entity === 'user' && (method === 'post' || method === 'patch')){
      newBody = {
        'username' : body.req_data.username
      }
    }

    if(entity === 'question') {
        newBody = {
            "user" : {
                "id" : body.req_data.user.id
            }
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
