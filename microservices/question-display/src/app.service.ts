import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { paginate } from './general/gen_functions';
import { KeywordsService } from './keyword/keywords.service';
import { QuestionService } from './question/question.service';

@Injectable()
export class AppService {
  constructor(private readonly questionService: QuestionService){}

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
}
