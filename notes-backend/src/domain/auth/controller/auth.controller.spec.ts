import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockClass, MockType } from '../../../../test/mocks';
import { AuthService } from '../providers/auth.service';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { fullUserCredentialsDTO } from '../fixtures';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let app: NestApplication;
  let controller: AuthController;
  let service: MockType<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockClass(AuthService),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return authentication token', async () => {
      const token = 'authToken';
      const loginSpy = jest
        .spyOn(service, 'login')
        .mockImplementation(() => ({ token }));

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(fullUserCredentialsDTO)
        .expect(HttpStatus.OK);

      expect(loginSpy).toHaveBeenCalled();
      expect(response.body).toBeDefined();
      expect(response.body.token).toBe(token);
    });
  });
});
