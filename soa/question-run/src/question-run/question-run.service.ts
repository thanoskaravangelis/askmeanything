import { Injectable } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import axios from "axios";
import { BadRequestException } from '@nestjs/common';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { CreateUserAnswerVoteDto } from 'src/user-answer-vote/dto/create-user-answer-vote.dto';

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
    
    async vote(body: CreateUserAnswerVoteDto) {
        const requestUrl = 'user-answer-vote';
        let userId, answerId,voteId,checkdata;
        let alrExists;
        if(body.user.id && body.answer.id) {
            userId = body.user.id;
            answerId = body.answer.id;
            const reqUrl2 = `/onebyIds/${userId}/${answerId}`;
            const checkVote = await axios.get(requestUrl+reqUrl2);
            checkdata = checkVote.data;
            voteId = checkdata.id;
        }
        if(!checkdata) {
            return axios.post(requestUrl,body).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }else {
            const reqAdder = `user-answer-vote/${voteId}`;
            const deleted = axios.delete(reqAdder).then((response) => { return response.data; })
            .catch(() => {
                throw new BadRequestException("Could not fetch data from the Data Layer.");
            });
            if(deleted) {
                return axios.post(requestUrl,body).then((response) => {return response.data;})
                .catch(() => {
                    throw new  BadRequestException("Could not fetch data from the Data Layer.");
                });
            }else{
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            }
            
        }
    }

    removeVote(id : number) {
        const requestUrl = `user-answer-vote/${id}`;
        return axios.delete(requestUrl).then((response) => { return response.data; })
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });
    }
}
