import { BadRequestException, Injectable } from '@nestjs/common';
import axios from "axios";
import { paginate } from 'src/general/gen_functions';
import { CreateKeywordDto } from 'src/keyword/dto/create-keyword.dto';
import { CreateQuestionHasKeywordDto } from 'src/question-has-keyword/dto/create-question-has-keyword.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class QuestionManService {

    getQuestions(start, end) {
        const requestUrl = 'question';
        const params = {
            user: true,
            keywords : true,
            answers:true,
        };
        return axios.get(requestUrl,{ params }).then((response) => {return paginate(response.data ,{'start':start,'end': end});})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        })
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
        return axios.get(requestUrl,{ params }).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    createKeyword(body: CreateKeywordDto) {
        const requestUrl = 'keywords';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    createQuestion(body : CreateQuestionDto) {
        const requestUrl = 'question';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    createQuestionHasKeyword(body: CreateQuestionHasKeywordDto) {
        const requestUrl = 'question-has-keyword';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }
}
