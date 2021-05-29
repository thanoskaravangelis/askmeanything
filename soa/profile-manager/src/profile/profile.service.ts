import { BadRequestException, Body, Injectable } from "@nestjs/common";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030';

@Injectable()
export class ProfileService {

  updateUser(id: string, @Body() body) {
    const requestUrl = `/users/${id}`;
    axios.patch(requestUrl, body).then((response) => {
      return response;
    }, () => {
      throw new BadRequestException("Could not fetch data from the Data Layer.");
    });
  }
}
