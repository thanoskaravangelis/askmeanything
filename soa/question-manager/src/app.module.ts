import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionManServiceModule } from './question-man-service/question-man-service.module';

@Module({
  imports: [QuestionManServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
