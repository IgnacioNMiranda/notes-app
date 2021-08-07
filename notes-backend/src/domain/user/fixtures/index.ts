import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const fullCreateUserDTO: CreateUserDto = {
  email: 'user@mail.com',
  password: 'pass123',
};

export const fullUpdateUserDTO: UpdateUserDto = {
  username: 'new username',
};

export const fullUserEntity = {
  _id: '610b061ef1f0ed2c0c590e29',
  email: 'user@mail.com',
  username: 'user',
  __v: 0,
};

export const usersList = [
  {
    _id: '610b061ef1fdsd2c0c590e29',
    email: 'user@mail.com',
    username: 'user',
    __v: 0,
  },
  {
    _id: '610b06asd1f0ed2c0c590e29',
    email: 'user2@mail.com',
    username: 'user2',
    __v: 0,
  },
];
