import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(createUserDto: CreateUserDto) {
    return 'This user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException('Not found mate');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
