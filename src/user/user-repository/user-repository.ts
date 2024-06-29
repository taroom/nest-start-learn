import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private PrismaService: PrismaService) {
        console.info(`Create user repository`);
    }

    async save(firstName: string, lastName?: string): Promise<User> {
        return await this.PrismaService.user.create({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })
    }
}