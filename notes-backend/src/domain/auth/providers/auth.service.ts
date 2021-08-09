import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../../domain/user/entities/user.entity';
import { CryptoUtil } from '../../../utils/crypto/crypto.util';
import { UserCredentialsDTO } from '../dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof User>,
    private readonly cryptoUtil: CryptoUtil,
    private readonly jwtService: JwtService,
  ) {}

  async login(userCredentials: UserCredentialsDTO) {
    const { email, password } = userCredentials;

    const user = await this.userRepository
      .findOne({ email })
      .select(['_id', 'email', 'password', 'username'])
      .exec();
    const validPassword = await this.cryptoUtil.compare(
      password,
      user?.password || '',
    );

    if (user == null || !validPassword) {
      throw new UnauthorizedException('Invalid user or password');
    }

    const { _id } = user;
    const token = await this.jwtService.signAsync({ _id, email });
    return { token };
  }
}
