import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import axios from "axios";
import { verify } from 'src/general/gen_functions'
import { BadRequestException } from '@nestjs/common';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { CreateUserAnswerVoteDto } from 'src/user-answer-vote/dto/create-user-answer-vote.dto';

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class QuestionRunService {
    async createAnswer(headers:any, body: CreateAnswerDto){
        let id : number = await verify(headers);

        if(body.user.id == id) {
            const requestUrl = 'answer';
            return axios.post(requestUrl,body).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
        else {
            throw new UnauthorizedException("Unauthorized action.");
        }
    }

    async editAnswer(headers:any, body: UpdateAnswerDto, ansid: number) {
        let id : number = await verify(headers);
        
        const requestUrl = `answer/${ansid}`;
        const params = {
            id : ansid,
            user: true
        };
        let userId;
        const answerGet = await axios.get('answer/one', { params })
        .then((response) => { userId = response.data.user.id; })
        .catch( () => {
            throw new BadRequestException("Could not fetch data from the Data Layer.");
        })

        if(userId == id) {
            console.log(body);
            return axios.patch(requestUrl,body).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
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
        const answerGet = await axios.get('answer/one', { params })
        .then((response) => { userId = response.data.user.id; })
        .catch( () => {
            throw new BadRequestException("Could not fetch data from the Data Layer.");
        });

        if ( userId == id) {
            const requestUrl = `answer/${ansid}`;
            return axios.delete(requestUrl).then((response) => {return response.data;})
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
        else {
            throw new UnauthorizedException("Unauthorized action.");
        }

    }

    async checkVote(headers:any,ansid) {
        let id : number = await verify(headers);

        const requestUrl = `answer/one`;
        const params = {
            id : ansid,
            user: true,
            votes:true
        };

        const answer = await axios.get(requestUrl, { params })
        .then((response) => {console.log(response.data); return response.data; })
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });

    
        let hasupvoted =false ,hasdownvoted = false;
        for(let i=0;i < answer.votes.length; i++) {
            if(answer.votes[i].userId == id){
                hasupvoted = answer.votes[i].upvote;
                hasdownvoted = answer.votes[i].downvote;
            }
        }
        return { "hasupvoted" : hasupvoted , 
                "hasdownvoted" : hasdownvoted}
    }
    
    async vote(headers:any, body: CreateUserAnswerVoteDto) {
        let id : number = await verify(headers);

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
        }
        else {
            
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

    async removeVote(headers:any, voteid : number) {
        let id : number = await verify(headers);

        const requestUrl = `user-answer-vote/${voteid}`;

        let userId;
        const thisVote = await axios.get(requestUrl).then((response) => { userId = response.data.userId; })
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        });

        if(id == userId) {
            return axios.delete(requestUrl).then((response) => { return response.data; })
            .catch(() => {
                throw new  BadRequestException("Could not fetch data from the Data Layer.");
            });
        }
        else {
            throw new UnauthorizedException("Unauthorized action.");
        }
    }
}
