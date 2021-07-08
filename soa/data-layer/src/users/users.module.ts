import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users2Controller, UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController,Users2Controller],
  providers: [UsersService]
})
export class UsersModule {}
