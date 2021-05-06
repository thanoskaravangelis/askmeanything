import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionModule } from './question/question.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [UsersModule, QuestionModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
