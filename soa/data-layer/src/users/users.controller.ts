import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one')
  findOne(@Param('id') id: string,@Query() params:any) {
    return this.usersService.findOne(+id,params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //additional from CRUD

  @Get(':id/myquestions')
  findMyQuestions(@Param('id') id: string) {
    return this.usersService.findMyQuestions(+id);
  }

  @Get(':id/myanswers')
  findMyAnswers(@Param('id') id : string) {
    return this.usersService.findMyAnswers(+id);
  }

  @Get('verifymail/:email')
  findForMail(@Param('email') email:string) {
    return this.usersService.findUserByEmail(email);
  }
}

@Controller('users')
export class Users2Controller{
  constructor(private readonly usersService: UsersService) {}

  @Get('verify/:user')
  findForAuth(@Param('user') user : string) {
    return this.usersService.findUserByUsernameandPassword(user);
  }
}
