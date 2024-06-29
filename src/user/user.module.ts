import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoConnection, MySQLConnection, createConnection } from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService]

    }, {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: 'EmailService',//alias provider
      useExisting: MailService
    },
    UserRepository,
    MemberService
  ],
  exports: [UserService],
  // service harus diregistrasikan disini jika tidak dia tidak akan terpanggil walau sudah kita buat
})
export class UserModule { }
