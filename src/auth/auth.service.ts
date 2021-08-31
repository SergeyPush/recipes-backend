import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  logIn(loginUserDto: LoginUserDto) {
    return this.userService.logIn(loginUserDto);
  }
}
