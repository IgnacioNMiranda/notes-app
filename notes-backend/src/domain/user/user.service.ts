import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CryptoUtil } from '../../utils/crypto/crypto.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof User>,
    private readonly cryptoUtil: CryptoUtil,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userRepository(createUserDto);
      newUser.password = await this.cryptoUtil.encrypt(newUser.password);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(
          `'${createUserDto.email}' email is already registered.`,
        );
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  findAll() {
    return this.userRepository.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    user.username = updateUserDto.username;

    await user.save();
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findById(id);
    if (user == null) {
      throw new NotFoundException('User not found');
    }

    await user.remove();
    return;
  }
}
