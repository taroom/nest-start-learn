import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.asyncSayHello();
    expect(response).toBe('Hallo Kawan saya menggunakan async');
  });

  it('should read view html with node mock', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Taroom', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Taroom',
      title: 'Nest with HTML Render View'
    })
  });
});
