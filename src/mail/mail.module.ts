import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: 587,
          requireTLS: true,
          secure: false, // true for 465, false for other ports
          auth: {
            user: await config.get('EMAIL_USER'), // generated ethereal user
            pass: await config.get('EMAIL_PASS'), // generated ethereal password
          },
        },
        defaults: {
          from: '"recipes-admin" [No Reply]', // outgoing email ID
        },
        template: {
          dir: __dirname + '/templates/',
          adapter: new HandlebarsAdapter(undefined, {
            inlineCssEnabled: true,
            inlineCssOptions: {
              url: ' ',
              preserveMediaQueries: true,
            },
          }), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
