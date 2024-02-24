import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  remove(email: string) {
    return `This action removes a user`;
  }
}
