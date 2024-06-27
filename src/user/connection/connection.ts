import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

export function createConnection(configService: ConfigService): Connection {
    if (configService.get('DATABASE') == 'mysql') {
        return new MySQLConnection();
    } else if (configService.get('DATABASE') == 'mongo') {
        return new MongoConnection();
    } else {
        return new PostgreConnection();
    }
}