import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from "axios";
import { response } from 'express';
import { paginate, verify } from 'src/general/gen_functions';
import { CreateKeywordDto } from 'src/keyword/dto/create-keyword.dto';
import { CreateQuestionHasKeywordDto } from 'src/question-has-keyword/dto/create-question-has-keyword.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';

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
        });
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

    getKeywords(start,end){
        const requestUrl='keywords';
        return axios.get(requestUrl).then((response) => {return paginate(response.data ,{'start':start,'end': end});})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    async createKeyword(headers:any,body: CreateKeywordDto) {
        let id : number = await verify(headers);

        const requestUrl = 'keywords';
        let name = body.name;
        let resp = await axios.get(requestUrl+`/byname/${name}`);
        if(resp.data.name)
            return resp.data;
        else {
            return axios.post(requestUrl,body).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
    }

    async editQuestion(headers:any, body: UpdateQuestionDto, questId:number) {
        let id :number = await verify(headers);

        const requestUrl = `question/${questId}`;
        const params = { 'id' : questId, 'user' : true };
        const question = await axios.get(`question/one`,{ params })
        .then((response) => {return response.data;})
        .catch(() => { throw new BadRequestException("Could not fetch data from the Data Layer.")});
        if(id==question.user.id) {
            console.log(`User with id ${id} has the right to edit the question.`);
            return axios.patch(requestUrl,body).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
        else {
            throw new UnauthorizedException("Unauthorized action.")
        }
    }

    async createQuestion(headers:any, body : CreateQuestionDto) {
        let id:number = await verify(headers);

        const requestUrl = 'question';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    async deleteQuestion(headers:any, questId:number) {
        let id:number = await verify(headers);

        const requestUrl = `question/${questId}`;
        const params = { 'id' : questId, 'user' : true };
        const question = await axios.get(`question/one`,{ params }).then((response) => {return response.data;})
        .catch(() => { throw new BadRequestException("Could not fetch data from the Data Layer.")});
        if(id==question.user.id) {
            console.log(`User with id ${id} has the right to delete the question.`);
            return axios.delete(requestUrl).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
        else {
            throw new UnauthorizedException("Unauthorized action.")
        }
    }

    async createQuestionHasKeyword(headers:any, body: CreateQuestionHasKeywordDto) {
        let id : number = await verify(headers);

        const requestUrl = 'question-has-keyword';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    async removeQuestionKeyword(headers:any, relationId:number) {
        let id : number = await verify(headers);

        const requestUrl = `question-has-keyword/${relationId}`;
        return axios.delete(requestUrl).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }
}
