import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    return null;
  }

  async signUp(userDto: CreateUserDto) {
    const { username, password, email } = userDto;
    const candidate = await this.findOne(email);
    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      username,
      password: encryptedPassword,
      email,
    });
    return user.save();
  }
}
