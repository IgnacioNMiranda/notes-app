import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { configuration } from '../../../configuration/configuration.test';
import { CryptoUtil } from '../../../utils/crypto/crypto.util';
import { UserModelMock } from '../../user/mocks/user.model.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration] }),
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
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: UserModelMock,
        },
        CryptoUtil,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
