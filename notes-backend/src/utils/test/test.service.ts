import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../../domain/user/entities/user.entity';
import { Note } from '../../domain/note/entities/note.entity';
import { InjectModel } from 'nestjs-typegoose';
import { fullCreateUserDTO } from 'src/domain/user/fixtures';
import { CryptoUtil } from '../crypto/crypto.util';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Note)
    private readonly noteRepository: ReturnModelType<typeof Note>,
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof User>,
    private readonly cryptoUtil: CryptoUtil,
  ) {}

  async clearTestingDatabase() {
    await this.noteRepository.deleteMany({});
    await this.userRepository.deleteMany({});
  }

  async generateTestingEntities() {
    const newUser = new this.userRepository(fullCreateUserDTO);
    newUser.password = await this.cryptoUtil.encrypt(newUser.password);
    await newUser.save();
  }
}
