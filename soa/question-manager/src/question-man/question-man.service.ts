import { BadRequestException, Injectable } from '@nestjs/common';
import axios from "axios";
import { response } from 'express';
import { paginate } from 'src/general/gen_functions';

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class QuestionManService {

    getQuestions(start,end){
        const requestUrl = 'question';
        return axios.get(requestUrl).then((response) => {return paginate(response.data ,{'start':start,'end': end});})
        .catch(() => {
            throw new  BadRequestException("Could not fetch data from the Data Layer.");
        })
    } 
}
