import { Controller, Request, Post, UseGuards, Get, Query } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { UsersService } from "./users/users.service";
import { CreateUserDto } from "./users/dto/create-user.dto";
import { Body } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService,private readonly usersService: UsersService
    ,private readonly appService : AppService) {}

  @Get()
  listEndpoints() {
    return this.appService.listEndpoints();
  }

  @Get('allow')
  isAllowed(@Query() params: any) {
    return this.appService.isAllowed(params);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/whoami')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
