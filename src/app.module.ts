import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
