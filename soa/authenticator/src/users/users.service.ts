import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager, MetadataAlreadyExistsError} from "typeorm";
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

const dataUrl = 'http://localhost:3030/';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto): Promise<any> {
      const isOk = await this.validSignUp(createUserDto.username, createUserDto.email);
      if (isOk) {
        const user = await axios.post(dataUrl+'users',createUserDto);
        return user.data;
      }
      else {
        throw new BadRequestException(`Username or email already exist.`)
      }
  }

  async validSignUp(username,email) :Promise<boolean>{
    const res1 = await axios.get(dataUrl+`users/verify/${username}`);
    const res2 = await axios.get(dataUrl+`users/verifymail/${email}`);
    console.log(res1.data);
    console.log(res2.data);
    return !(res1).data && !(res2).data;
  }
}
