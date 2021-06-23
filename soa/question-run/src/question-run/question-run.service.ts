import { Injectable } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import axios from "axios";
import { BadRequestException } from '@nestjs/common';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { CreateUserAnswerVoteDto } from 'src/user-answer-vote/dto/create-user-answer-vote.dto';
import { response } from 'express';

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class QuestionRunService {
    createAnswer(body: CreateAnswerDto){
        const requestUrl = 'answer';
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    editAnswer(body: UpdateAnswerDto, id: number) {
        const requestUrl = `answer/${id}`;
        return axios.patch(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    deleteAnswer(id:number) {
        const requestUrl = `answer/${id}`;
        return axios.delete(requestUrl).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    vote(body: CreateUserAnswerVoteDto) {
        const requestUrl = `user-answer-vote`;
        return axios.post(requestUrl,body).then((response) => {return response.data;})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }

    removeVote(id : number) {
        const requestUrl = `user-answer-vote/${id}`;
        return axios.delete(requestUrl).then((response) => { return response.data; })
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }
}
