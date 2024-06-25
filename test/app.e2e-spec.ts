import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should check user say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/user/get-recommended-multi-query')
      .query({
        id: 2,
        address: 'Jombang'
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Recommended Nest with ID getter Multi Query ID 2 with Address: Jombang');
  });
});
