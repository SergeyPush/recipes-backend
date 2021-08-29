import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }
}
