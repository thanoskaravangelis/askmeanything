import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { verify } from './general/gen_functions';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

const CHOREO_URL = "http://localhost:3060/";
const ME = "http://localhost:3054";

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}
  
  async getProfile(headers:any, userid:number) {
    let id : number = await verify(headers);
    
    const params = {"id" : userid}
    const user = await this.usersService.findOne(userid,params);
    return user;
  }

  async createProfile(body:CreateUserDto) {
    return this.usersService.create(body);
  }

  async deleteProfile(headers:any, userid:number) {
    let id : number = await verify(headers);

    if(id == userid) {
      const user = await this.usersService.remove(userid);

      const sent = {
        "entity" : "user",
        "method" : "delete",
        "id" : userid,
        "from" : ME
      }

      console.log(sent);
      await axios.post(CHOREO_URL, {sent} ,{ headers }).then().catch(
        () => {
          throw new BadRequestException("Could not communicate with choreographer.")
        }
      )
      return user;
    }
    else{
      throw new UnauthorizedException("Unauthorized action.");
    }
  }

  async updateUser(headers:any, userid: number, body: UpdateUserDto ) {
    let id : number = await verify(headers);
  
    if(id === userid) {
      const user = await this.usersService.update(userid, body);

      const sent = {
        "entity" : "user",
        "method" : "patch",
        "id" : userid,
        "from" : ME,
        "req_data" : body
      }

      console.log(sent);
      await axios.post(CHOREO_URL, {sent} ,{ headers }).then().catch(
        () => {
          throw new BadRequestException("Could not communicate with choreographer.")
        }
      )
      return user;
    }
    else{
      throw new UnauthorizedException("Unauthorized action.");
    }
  }

  async choreo(body:any) {
    let entity = body.entity;
    let method = body.method;
    let newBody = body.req_data;
    let id = body.id;

    console.log({
      'method' : method,
      'entity' : entity
    });

    if(entity === 'user'){
      if(method === 'post') {
        const user = await this.usersService.create(newBody);
        console.log(user.username);
        return user;
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
