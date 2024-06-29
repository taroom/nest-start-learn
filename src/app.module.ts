import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user/user.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule { }