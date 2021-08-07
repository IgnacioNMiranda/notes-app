import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoUtil {
  encrypt(value: string, salt = 10) {
    return bcrypt.hash(value, salt);
  }
}
