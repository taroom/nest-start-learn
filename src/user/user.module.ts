import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoConnection, MySQLConnection } from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { UserRepository, createUserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: Connection,
    useClass: process.env.DATABASE === 'mysql' ? MySQLConnection : MongoConnection

  }, {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: 'EmailService',//alias provider
      useExisting: MailService
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]// karena createUserRepository butuh connection
    },
    MemberService]
  // service harus diregistrasikan disini jika tidak dia tidak akan terpanggil walau sudah kita buat
})
export class UserModule { }
