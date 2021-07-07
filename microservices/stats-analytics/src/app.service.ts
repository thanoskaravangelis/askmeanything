import { BadRequestException, Injectable } from '@nestjs/common';
import { verify } from './general/gen_functions';
import axios from 'axios';

@Injectable()
export class AppService {
  async getMyQuestions(headers:any, userid:number) {
    let id : number = await verify(headers);

    const params = {'questions' : true, 'id' : userid };

    const requestUrl = `/users/one`;
    return axios.get(requestUrl, {params}).then((response) => {console.log(`Got user's ${userid} questions.`); return response.data;}
    ,() => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  async getMyAnswers(headers:any, userid:number) {
    let id : number = await verify(headers);

    const params = {'answers' : true, 'id' : userid };

    const requestUrl = `users/one`;
    return axios.get(requestUrl,{ params }).then((response) => {console.log(`Got user's ${userid} answers.`); return response.data;}
    ,() => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  async getMyStats(headers:any, userid:number) {

      const requestUrl1 = `users/${userid}/myquestions`;
      const requestUrl2 = `users/${userid}/myanswers`;

      const totalq = await axios.get(requestUrl1);

      const answers =  await axios.get(requestUrl2);

      if(!totalq.data) {
        console.log("Bad request in total questions.")
        throw new BadRequestException("Could not fetch data from the Data Layer.")
      }

      if(!answers.data) {
        console.log("Bad request in total answers.")
        throw new BadRequestException("Could not fetch data from the Data Layer.")
      }

      console.log(`Got user's ${userid} stats.`);

      return {
        'totalQuestions' : totalq.data.length , 
        'totalAnswers' : answers.data.length
      }
  }

  getQuestionsPerKeyword(name:string) {
    const requestUrl = `keywords/questions/${name}`;
    const params = {
        questions:true,
        questionsUser: true,
        questionsKeywords : true,
        questionsAnswers: true,
    }; 
    return axios.get(requestUrl,{ params }).then((response) => {console.log(`Got keyword's {${name}} questions.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    })
  }

  async getQuestionsPerKeywordStats() {
    const requestUrl = `keywords/stats/questionsperkeyword`;
    const params = {
        questions:true,
        questionsUser: true,
        questionsKeywords : true,
        questionsAnswers: true,
    };
    const keywords = await axios.get(requestUrl,{ params }).then((response) => {console.log(`Got keywords' stats.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
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

  getQuestionsPerDay() {
    const requestUrl = 'question/daily/stats';
    return axios.get(requestUrl).then((response) => {console.log(`Got daily questions stats.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getQuestionsPerMonth() {
    const requestUrl = 'question/monthly/stats';
    return axios.get(requestUrl).then((response) => {console.log(`Got monthly questions stats.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getAnswersPerDay() {
    const requestUrl = 'answer/daily/stats';
    return axios.get(requestUrl).then((response) => {console.log(`Got daily answers stats.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getAnswersPerMonth() {
    const requestUrl = 'answer/monthly/stats';
    return axios.get(requestUrl).then((response) => {console.log(`Got monthly answers stats.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getQuestionPerMonthAnalytics(month: string,year:string) {
    const requestUrl = 'question/monthly/analytics/'+year+'/'+month;
    return axios.get(requestUrl).then((response) => {console.log(`Got monthly questions analytics.`);return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getQuestInDateSpan(startDate:string, endDate:string) {
    const requestUrl = 'question/from/'+startDate+'/to/'+endDate;
    return axios.get(requestUrl).then((response) => {console.log(`Got questions from ${startDate} to ${endDate}.`); return response.data;})
    .catch(() => {
        throw new  BadRequestException("Could not fetch data from the Data Layer.");
    });
  }
}
