import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import axios from "axios";

const CHOREO_URL ="http://localhost:3060";
const ME = "http://localhost:3051";

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService){}
  private endpoints = [
    {
      regex : new RegExp('auth/login|whoami|signup'),
      valid: true,
      authorize: true
    }
  ];

  listEndpoints() {
    let returned = [];
    for (let i = 0; i < this.endpoints.length; i++) {
      returned.push(
        {
          url: this.endpoints[i].regex.toString(),
          valid : this.endpoints[i].valid,
          authorize : this.endpoints[i].authorize
        }
      )
    }

    return returned; 
  }

  async signUp(body:CreateUserDto) {
    const user = await this.usersService.create(body);

    const sent = {
      "entity" : "user",
      "method" : "post",
      "from" : ME,
      "req_data" : body
    }
    console.log(sent);
    await axios.post(CHOREO_URL+'/', sent).then().catch(
      (err) => {
        console.log(err);
        throw new BadRequestException("Could not communicate with choreographer.")
      }
    )
    
    return user;
  }

  choreo(body:any) {
    let entity = body.entity;
    let method = body.method;
    let newBody = body.req_data;
    let id = body.id;

    if(entity === 'user'){
      if(method === 'post') {
        return this.usersService.create(newBody);
      }
      if(method === 'patch') {
        return this.usersService.update(id,newBody)
      }
      if(method === 'delete') {
        return this.usersService.remove(id);
      }
    }
  }
}
