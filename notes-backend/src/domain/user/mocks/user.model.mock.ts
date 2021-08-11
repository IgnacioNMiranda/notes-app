import { CreateUserDto } from '../dto/create-user.dto';

export class UserModelMock {
  email: string;
  username: string;
  password: string;

  constructor(createUserDto: CreateUserDto) {
    this.email = createUserDto.email;
    this.username = createUserDto.email.split('@')[0].replace(/_|\.|-/g, '');
    this.password = createUserDto.password;
  }

  public save = () => jest.fn().mockImplementation(() => ({}));
  static find = () => jest.fn();
  static findById = () => jest.fn();
  remove = () => jest.fn().mockImplementation(() => ({}));
}
