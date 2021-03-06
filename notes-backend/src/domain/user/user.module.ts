import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserController } from './controllers/user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entities/user.entity';
import { CryptoUtil } from '../../utils/crypto/crypto.util';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CryptoUtil],
})
export class UserModule {}
