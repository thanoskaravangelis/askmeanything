import { Injectable } from '@nestjs/common';
import {Md5} from 'ts-md5/dist/md5';
import { JwtService } from '@nestjs/jwt';
import axios from "axios";
import { UsersService } from 'src/users/users.service';

const dataUrl = 'http://localhost:3030/'
@Injectable()
export class AuthService {
  
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async validateUser(username: string, pass:string): Promise<any> {
    let hashed = Md5.hashStr(pass).toString();

    const user = await axios.get(dataUrl+`users/verify/${username}`);
    if(!user.data) 
      return null;
    else {
      console.log('user_data:'+user.data);
    }
    let passwd = user.data.password;
    if(user && passwd === /*Md5.hashStr(pass)*/pass.toString()) {
      const { password, ...result} = user.data;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


