import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate, verify } from './general/gen_functions';
import axios from 'axios';
import { QuestionService } from './question/question.service';
import { KeywordsService } from './keyword/keywords.service';
import { UsersService } from './users/users.service';
import { start } from 'repl';
import { AnswerService } from './answer/answer.service';
import { UserAnswerVoteService } from './user-answer-vote/user-answer-vote.service';
import { QuestionHasKeywordsService } from './question-has-keyword/question-has-keywords.service';

@Injectable()
export class AppService {
  constructor(private readonly questionService: QuestionService ,
    private readonly usersService : UsersService,
    private readonly answerService : AnswerService,
    private readonly keywordService : KeywordsService,
    private readonly userAnswerVote : UserAnswerVoteService,
    private readonly questionHasKeywordService : QuestionHasKeywordsService){
   }

  async getMyQuestions(start,end,headers:any, userid:number) {
    let id : number = await verify(headers);

    const params = {'questions' : true, 'id' : userid};
    const questions = await this.usersService.findOne(userid,params);
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }

    const nested = paginate(questions.questions,{'start':start,'end':end});
    delete questions.questions;
    questions["questions"] = nested; 

    return questions;
  }

  async getMyAnswered(start,end,headers:any, userid:number) {
    let id : number = await verify(headers);

    const params = {'answers' : true, 'user' : true, 'keywords' : true };
    const questions = await this.questionService.findAll(params);
    if(!questions){
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    }
    
    let myanswered = [];

    for(let i = 0; i < questions.length; i++) {
      for(let j = 0; j < questions[i].answers.length; j++) {
        if(questions[i].answers[j].userId == userid) {
          myanswered.push(questions[i]);
          break;
        }
      }
    }
    console.log(start,end);
    return paginate(myanswered,{'start':start,'end':end});
  }

  async getMyStats(headers:any, userid:number) {

      const totalq = await this.usersService.findMyQuestions(userid);

      const answers =  await this.usersService.findMyAnswers(userid);

      if(!totalq) {
        console.log("Bad request in total questions.")
        throw new BadRequestException("Could not fetch questions data.")
      }

      if(!answers) {
        console.log("Bad request in total answers.")
        throw new BadRequestException("Could not fetch answers data.")
      }

      console.log(`Got user's ${userid} stats.`);

      return {
        'totalQuestions' : totalq.length , 
        'totalAnswers' : answers.length
      }
  }

  async getQuestionsPerKeyword(start,end,name:string) {
    const params = {
        questions:true,
        questionsUser: true,
        questionsKeywords : true,
        questionsAnswers: true,
    }; 
    const questions = await this.keywordService.findQuestionsPerKeyword(params,name);
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }

    let newQuest = [];

    for(let i = 0; i < questions.questions.length; i++){
      newQuest.push(questions.questions[i].question);
    }
    delete questions.questions;
    const paginated =  paginate(newQuest,{'start':start,'end':end});
    questions["questions"] = paginated;

    return questions;
  }

  async getQuestionsPerKeywordStats() {
    const requestUrl = `keywords/stats/questionsperkeyword`;
    const params = {
        questions:true,
        questionsUser: true,
        questionsKeywords : true,
        questionsAnswers: true,
    };
    const keywords = await this.keywordService.findQuestionsPerKeywordsStats(params);
    if(!keywords) {
      throw new BadRequestException("Could not fetch keywords data.");
    }
    let arr = [];
    keywords.forEach( (obj) => {
      if(obj.questions) {
        arr.push({"name" : obj.name, "amount" : obj.questions.length});
      }
    });

    arr.sort( (a,b) => {return parseInt(b.amount) - parseInt(a.amount);});
    arr.slice(0,10);
    return arr;
  }

  async getQuestionsPerDay() {
    const questions = await this.questionService.getQuestionsPerDay();
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }
    return questions;
  }

  async getQuestionsPerMonth() {
    const questions = await this.questionService.getQuestionsPerMonth()
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }
    return questions;
  }

  async getAnswersPerDay() {
    const answers = this.answerService.getAnswersPerDay();
    if(!answers) {
      throw new BadRequestException("Could not fetch answers data.");
    }
    return answers;
  }

  async getAnswersPerMonth() {
    const answers = await this.answerService.getAnswersPerMonth();
    if(!answers) {
      throw new BadRequestException("Could not fetch answers data.");
    }
    return answers;
  }

  async getQuestionPerMonthAnalytics(start,end,month: string,year:string) {
    const questions = await this.questionService.getQuestionsPerMonthAnalytics(month,year);
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }
    return paginate(questions,{'start':start,'end':end});
  }

  async getQuestInDateSpan(start,end,startDate:string, endDate:string) {
    const questions = await this.questionService.getQuestionsInDateSpan(startDate,endDate);
    if(!questions) {
      throw new BadRequestException("Could not fetch questions data.");
    }
    return paginate(questions,{'start':start,'end':end});
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
