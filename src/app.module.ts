import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user/user.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule { }