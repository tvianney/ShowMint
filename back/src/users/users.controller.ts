import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() UserDto: UserDto) {
    return this.usersService.create(UserDto);
  }


  @Delete()
  remove(@Body('email') email: string) {
    return this.usersService.remove(email);
  }
}
