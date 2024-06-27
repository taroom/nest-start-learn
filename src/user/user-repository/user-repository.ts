import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

// Anggap saja ini bukan kode kita sehingga tidak injectable()
export class UserRepository {
    connection: Connection;
    save() {
        console.info(`save user with connection ${this.connection.getName()}`)
    }
}

export function createUserRepository(connection: Connection): UserRepository {
    const repository = new UserRepository();
    repository.connection = connection;
    return repository;
}
