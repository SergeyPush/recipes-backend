import { createParamDecorator } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0].user;
});
