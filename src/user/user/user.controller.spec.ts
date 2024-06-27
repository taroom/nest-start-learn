import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]//disini harus diregisterkan
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello with service', async () => {
    const response = await controller.asyncSayHelloBro('Taroom');
    expect(response).toBe('hallo Taroom');
    const response2 = await controller.asyncSayHelloBro('Khoirul');
    expect(response2).toBe('hallo Khoirul');
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
