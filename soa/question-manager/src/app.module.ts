import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionManServiceModule } from './question-man-service/question-man-service.module';
import { QuestionManModule } from './question-man/question-man.module';

@Module({
  imports: [QuestionManServiceModule, QuestionManModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
