// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';
import { DecodedUserInfo } from '../middlewares/interfaces';

declare global {
  namespace Express {
    export interface Request {
      user: DecodedUserInfo;
    }
  }
}
