import { Injectable } from '@nestjs/common';

export class Connection {
    public getName(): string {
        return null;
    }
}

@Injectable()
export class MySQLConnection extends Connection {
    public getName(): string {
        return 'MYSQL DB Connection';
    }
}

@Injectable()
export class MongoConnection extends Connection {
    public getName(): string {
        return 'Mongo DB Connection';
    }
}

@Injectable()
export class PostgreConnection extends Connection {
    public getName(): string {
        return 'PostgreSQL DB Connection';
    }
}