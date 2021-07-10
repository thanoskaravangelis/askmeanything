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
      const sent = {
        "entity" : "user",
        "method" : "delete",
        "id" : userid,
        "from" : ME
      }
      console.log(headers);
      console.log(sent);
      await axios.post(CHOREO_URL, {sent} ,{ headers }).then().catch(
        () => {
          throw new BadRequestException("Could not communicate with choreographer.")
        }
      )
      return this.usersService.remove(userid);
    }
    else{
      throw new UnauthorizedException("Unauthorized action.");
    }
  }

  async updateUser(headers:any, userid: number, body: UpdateUserDto ) {
    let id : number = await verify(headers);
  
    if(id === userid) {
      return this.usersService.update(userid, body);
    }
    else{
      throw new UnauthorizedException("Unauthorized action.");
    }
  }

  choreo(body:any) {
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
