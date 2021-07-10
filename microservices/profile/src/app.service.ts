import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { verify } from './general/gen_functions';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

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
}
