import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  listEndpoints() {
    return this.appService.listEndpoints();
  }

  @Get('allow')
  isAllowed(@Query() params: any) {
    return this.appService.isAllowed(params);
  }
  
}
