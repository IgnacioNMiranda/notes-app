import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { UserModelMock } from './mocks/user.model.mock';
import { CryptoUtil } from '../../utils/crypto/crypto.util';
import { UserService } from './user.service';
import { CryptoUtilMock } from '../../utils/crypto/mocks';
import {
  fullCreateUserDTO,
  fullUpdateUserDTO,
  fullUserEntity,
  usersList,
} from './fixtures';
import { HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: UserModelMock,
        },
        {
          provide: CryptoUtil,
          useValue: CryptoUtilMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = await service.create(fullCreateUserDTO);
      expect(newUser.email).toBe(fullCreateUserDTO.email);
      expect(newUser.username).toBe(
        fullCreateUserDTO.email.split('@')[0].replace(/_|\.|-/g, ''),
      );
      expect(newUser.password).not.toBe(fullCreateUserDTO.password);
    });

    xit('should throw BAD_REQUEST if email is duplicated', async () => {
      // TODO
    });

    xit('should throw INTERNAL_SERVER_ERROR', async () => {
      // TODO
    });
  });

  describe('findAll', () => {
    it('should retrieve every user', async () => {
      const findSpy = jest
        .spyOn<any, any>(UserModelMock, 'find')
        .mockImplementation(() => {
          return {
            exec: () => usersList,
          };
        });

      const users = await service.findAll();

      expect(findSpy).toHaveBeenCalled();
      expect(users).toBeDefined();
      expect(users).toEqual(usersList);
    });
  });

  describe('findOne', () => {
    it('should retrieve specific user', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation((id) => {
          expect(id).toBeDefined();
          return fullUserEntity;
        });

      const user = await service.findOne('dummyId');

      expect(findByIdSpy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user).toEqual(fullUserEntity);
    });

    it('should throw NOT_FOUND if user is not found', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation(() => null);

      let error: any;
      try {
        await service.findOne('dummyId');
      } catch (notFoundError) {
        error = notFoundError;
      }

      expect(findByIdSpy).toHaveBeenCalled();
      expect(error).toBeDefined();
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  describe('update', () => {
    xit('should update user with new data', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation((id) => {
          expect(id).toBeDefined();
          return fullUserEntity;
        });
      // TODO: Mock save method.
      const user = await service.update('dummyId', fullUpdateUserDTO);

      expect(findByIdSpy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user.username).toEqual(fullUpdateUserDTO.username);
    });

    it('should throw NOT_FOUND if user is not found', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation(() => null);

      let error: any;
      try {
        await service.update('dummyId', fullUpdateUserDTO);
      } catch (notFoundError) {
        error = notFoundError;
      }

      expect(findByIdSpy).toHaveBeenCalled();
      expect(error).toBeDefined();
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  describe('remove', () => {
    xit('should remove user and return', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return fullUserEntity;
        });
      // TODO: mock de método non-static remove.
      await service.remove('dummyId');
      expect(findByIdSpy).toBeCalled();
    });

    it('should throw NOT_FOUND exception if found user == null', async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation(() => {
          return null;
        });

      let error: { response: any; status: number };
      try {
        await service.remove('dummyId');
      } catch (notFoundError) {
        error = notFoundError;
      }

      expect(findByIdSpy).toHaveBeenCalled();
      expect(error).toBeDefined();
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
