import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.manager.create(User, createUserDto);
    return this.manager.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.manager.findOne(User, id);
    if(!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findUserByUsernameandPassword(username: string ,pass: string): Promise< User | undefined > {
    const user = await this.manager.createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username = :usrnm", {usrnm: username})
      .andWhere("user.password =:pwd", {pwd: pass})
      .getOne();
    return user;
  }
}
