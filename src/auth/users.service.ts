import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }).select('-password');
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
    await user.save();
    return this.generateToken({ email: user.email, id: user.id });
  }

  async logIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    return this.generateToken({ email: user.email, id: user.id });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('No such user');
    }

    const passwordIsValid = await bcrypt.compare(pass, user.password);
    if (user && passwordIsValid) {
      return user;
    }
    throw new UnauthorizedException('Email or password is invalid');
  }

  async generateToken(payload) {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
