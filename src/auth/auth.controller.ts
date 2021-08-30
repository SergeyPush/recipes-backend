import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return 'Login';
  }
}
