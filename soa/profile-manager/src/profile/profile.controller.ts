import { Controller, Body, Patch, Param } from "@nestjs/common";
import { ProfileService } from './profile.service';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    return this.profileService.updateUser(id,body);
  }
}
