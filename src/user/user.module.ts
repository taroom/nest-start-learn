import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoConnection, MySQLConnection } from './connection/connection';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: Connection,
    useClass: process.env.DATABASE === 'mysql' ? MySQLConnection : MongoConnection

  }]
  // service harus diregistrasikan disini jika tidak dia tidak akan terpanggil walau sudah kita buat
})
export class UserModule { }
