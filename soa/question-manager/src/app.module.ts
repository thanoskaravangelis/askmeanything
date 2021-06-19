import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionManModule } from './question-man/question-man.module';

@Module({
  imports: [QuestionManModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
