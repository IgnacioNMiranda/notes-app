import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './controller/auth.controller';
import { CryptoUtil } from '../../utils/crypto/crypto.util';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get<string>('jwt.publicKey'),
        privateKey: configService.get<string>('jwt.privateKey'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
          algorithm: 'RS256',
        },
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
  ],
  providers: [AuthService, CryptoUtil],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
