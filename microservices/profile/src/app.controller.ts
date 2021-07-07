import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';

@Controller('profile')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser(@Param('id') id:string) {
    return this.appService.getProfile(+id);
  }

  @Post()
  postUser?(@Body() body:CreateUserDto) {
    return this.appService.createProfile(body);
  }

  @Patch(':id/edit')
  updateUser(@Param('id') id: string, @Body() body:UpdateUserDto,@Request() req:any ) {
    return this.appService.updateUser(req.headers, +id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id:string,@Request() req:any){
    return this.appService.deleteProfile(req.headers,+id);
  }

  //choreo endpoint to be added
}
