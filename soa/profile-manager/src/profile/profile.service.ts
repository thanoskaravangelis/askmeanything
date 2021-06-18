import { BadRequestException, Body, Injectable } from "@nestjs/common";
import axios from "axios";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class ProfileService {

  updateUser(id: string, body: UpdateUserDto ) {
    const requestUrl = `/users/${id}`;
    return axios.patch(requestUrl, body).then((response) => {return response.data;},
    () => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getMyQuestions(id:string) {
    const requestUrl = `/users/${id}/myquestions`;
    return axios.get(requestUrl).then((response) => {return response.data;}
    ,() => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  getMyAnswers(id:string) {
    const requestUrl = `users/${id}/myanswers`;
    return axios.get(requestUrl).then((response) => {return response.data;}
    ,() => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }

  async getMyStats(id:string) {
    const requestUrl1 = `users/${id}/myquestions`;
    const requestUrl2 = `users/${id}/myanswers`;


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

    return {
      'totalQuestions' : totalq.data.length , 
      'totalAnswers' : answers.data.length
    }
  }
}
