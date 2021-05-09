import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.manager.findOne(User, id);
    if(!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction( async manager => {
      const user = await this.manager.findOne(User, id);
      if (!user) throw new NotFoundException(`User #${id} not found`);
      this.manager.merge(User, user, updateUserDto);
      return this.manager.save(user);
    });
  }

  async remove(id: number): Promise<void>{
    return this.manager.transaction( async manager => {
      const user = await this.manager.findOne(User, id);
      if (!user) throw new NotFoundException(`User #${id} not found`);
      await manager.delete(User,id);
    });
  }
}
