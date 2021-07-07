import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from "../users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [UsersModule, PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '7200s'
    }
  })],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}

