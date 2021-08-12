import { configuration } from '../configuration/configuration';
import { CredentialsDTO } from '../interfaces/credentials.dto';
import axios from 'axios';
import { IResponseLogin } from '../interfaces/IResponseLogin';
import { LocalStorageUtil } from '../utils/LocalStorageUtil';

export class AuthService {
  static apiUrl = `${configuration.api.uri}/auth`;

  static login(credentials: CredentialsDTO) {
    return axios.post<IResponseLogin>(`${this.apiUrl}/login`, credentials);
  }

  static logout() {
    LocalStorageUtil.set('authToken', '');
  }

  static validateToken(token: string) {
    return axios.get(`${this.apiUrl}/validateToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
