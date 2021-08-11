import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mockClass, MockType } from '../../../../test/mocks';
import {
  fullCreateUserDTO,
  fullUpdateUserDTO,
  fullUserEntity,
  usersList,
} from '../fixtures';
import { UserController } from './user.controller';
import { UserService } from '../providers/user.service';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { IsObjectIdPipe } from '../../../pipes';

describe('UserController', () => {
  let app: NestApplication;
  let controller: UserController;
  let service: MockType<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockClass(UserService),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(IsObjectIdPipe.prototype, 'transform')
      .mockImplementation((value) => value);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a new created user and return status CREATED', async () => {
      service.create.mockImplementation(() => {
        return fullUserEntity;
      });

      const response = await request(app.getHttpServer())
        .post('/users/')
        .send(fullCreateUserDTO)
        .expect(HttpStatus.CREATED);

      expect(service.create).toHaveBeenCalled();
      expect(response.body).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should retrieve every user and return status OK', async () => {
      service.findAll.mockImplementation(() => {
        return usersList;
      });

      const response = await request(app.getHttpServer())
        .get('/users/')
        .expect(HttpStatus.OK);

      expect(service.findAll).toHaveBeenCalled();
      expect(response.body).toEqual(usersList);
    });
  });

  describe('findOne', () => {
    it('should retrieve specific user and return status OK', async () => {
      service.findOne.mockImplementation((id) => {
        expect(id).toBeDefined();
        return fullUserEntity;
      });

      const response = await request(app.getHttpServer())
        .get('/users/1')
        .expect(HttpStatus.OK);

      expect(service.findOne).toHaveBeenCalled();
      expect(response.body).toEqual(fullUserEntity);
    });
  });

  describe('update', () => {
    it('should update user entity and return status ACCEPTED', async () => {
      const oldUser = { ...fullUserEntity };
      const newUserData = { ...fullUpdateUserDTO };

      service.update.mockImplementation((id, newData) => {
        expect(id).toBeDefined();
        expect(newData).toBeDefined();

        const updatedUser = { ...oldUser };
        Object.keys(newData).forEach((key) => {
          updatedUser[key] = newData[key];
        });
        return updatedUser;
      });

      const response = await request(app.getHttpServer())
        .put('/users/1')
        .send(newUserData)
        .expect(HttpStatus.OK);

      expect(service.update).toHaveBeenCalled();
      expect(response.body.username).toBe(newUserData.username);
    });
  });

  describe('remove', () => {
    it('should remove user and return status NO_CONTENT', async () => {
      service.remove.mockImplementation((id) => {
        expect(id).toBeDefined();
      });

      await request(app.getHttpServer())
        .delete('/users/1')
        .expect(HttpStatus.NO_CONTENT);

      expect(service.remove).toHaveBeenCalled();
    });
  });
});
