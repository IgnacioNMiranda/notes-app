import { DynamicModule, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Note } from '../../domain/note/entities/note.entity';
import { User } from '../../domain/user/entities/user.entity';
import { CryptoUtil } from '../crypto/crypto.util';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({})
export class TestModule {
  static register(): DynamicModule {
    const controllers = [];
    const providers = [];

    if (process.env.NODE_ENV === 'test') {
      controllers.push(TestController);
      providers.push(TestService, CryptoUtil);
    }

    return {
      module: TestModule,
      imports: [TypegooseModule.forFeature([Note, User])],
      controllers,
      providers,
    };
  }
}
