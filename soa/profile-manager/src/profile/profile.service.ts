import { BadRequestException, Body, Injectable } from "@nestjs/common";
import axios from "axios";
import { response } from "express";

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class ProfileService {

  updateUser(id: string, @Body() body) {
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

  /*getMyStats(id:string) {
    const requestUrl1 = `users/${id}/myquestions`;
    const requestUrl2 = `users/${id}/myanswers`;
    let returnJSON = {};

    const totalquestions = async () => {
      let response = await axios.get(requestUrl1);
      return response.data;
    }

    returnJSON = {...returnJSON, 'totalQuestions' : totalquestions() }

    const answers = axios.get(requestUrl2).then((response) => {}
    ,() => {
      console.log("Bad request in total answers.")
      throw new BadRequestException("Could not fetch data from the Data Layer.")
    });

    return returnJSON;
  }*/
}
