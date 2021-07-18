import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Md5} from 'ts-md5/dist/md5';
import { JwtService } from '@nestjs/jwt';
import axios from "axios";
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

const jwt = require('jsonwebtoken');
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
    if(user && passwd === hashed) {
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

  verify(req:any) {
    const headers = req['myHeaders'];
    let token = '';
    headers.forEach((item: any) => {
        if (item.startsWith('Bearer')) {
          token = item.slice(7);
        }
    });

    let decoded = {};
    try {
        decoded = jwt.verify(token, jwtConstants.secret);
    } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
    }
    console.log({
        'username' : decoded['username'] ,
        'id' : decoded['id']
    });
    return {
        'username' : decoded['username'] ,
        'id' : decoded['id']
    };
  }
}


