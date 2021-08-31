import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'recipesapp4@gmail.com', // sender address
      subject: 'Welcome to Recipes App', // Subject line
      template: './confirmation',
      context: {
        name: user.username,
      },
    });
  }
}
