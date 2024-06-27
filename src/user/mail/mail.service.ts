import { Injectable } from '@nestjs/common';

// anggap library punya orang sehingga tidak dapat menggunakan @Injectable()
export class MailService {
    send() {
        console.info(`Mail has sended`);
    }
}

export const mailService = new MailService();