import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import {Md5} from 'ts-md5/dist/md5';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private  usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass:string): Promise<any> {
    let hashed = Md5.hashStr(pass).toString();
    const user = await this.usersService.findUserByUsernameandPassword(username,hashed);
    if(user && user.password === Md5.hashStr(pass).toString()) {
      const { password, ...result} = user;
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


