import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { configuration } from '../configuration/configuration.test';
import { AuthenticationMiddleware } from './authentication.middleware';

describe('AuthenticationMiddleware', () => {
  let middleware: AuthenticationMiddleware;
  let jwt: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
      exports: [JwtModule],
      providers: [AuthenticationMiddleware],
    }).compile();

    middleware = module.get<AuthenticationMiddleware>(AuthenticationMiddleware);
    jwt = module.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should return next() if authorization header and token are valid', async () => {
      const req: any = { user: undefined };
      const res: any = {};
      const next: any = () => 'next';
      const decryptPayload = {
        _id: 'dummyUserId',
        email: 'user@gmail.com',
        iat: 1,
        exp: 1,
      };

      const getTokenSpy = jest
        .spyOn(middleware, 'getToken')
        .mockImplementation(() => '');
      const verifyToken = jest
        .spyOn(middleware, 'verifyToken')
        .mockImplementation(async () => decryptPayload);

      const response = await middleware.use(req, res, next);

      expect(getTokenSpy).toHaveBeenCalled();
      expect(verifyToken).toHaveBeenCalled();
      expect(req.user).toEqual(decryptPayload);
      expect(response).toBe(next());
    });

    it('should throw UNAUTHORIZED if userData has been not retrieved successfully', async () => {
      const req: any = { user: undefined };
      const res: any = {};
      const next: any = () => 'next';

      const getTokenSpy = jest
        .spyOn(middleware, 'getToken')
        .mockImplementation(() => '');
      const verifyToken = jest
        .spyOn(middleware, 'verifyToken')
        .mockImplementation(async () => undefined);

      let error: any;
      try {
        await middleware.use(req, res, next);
      } catch (unauthorizedError) {
        error = unauthorizedError;
      }

      expect(getTokenSpy).toHaveBeenCalled();
      expect(verifyToken).toHaveBeenCalled();
      expect(error).toBeDefined();
      expect(error.response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('getToken', () => {
    it('should obtain token from Authorization header', () => {
      const expectedToken = 'token';
      const bearerToken = `Bearer ${expectedToken}`;
      const req: any = { header: () => bearerToken };

      const token = middleware.getToken(req);

      expect(token).toBe(expectedToken);
    });

    it('should throw UNAUTHORIZED if header is undefined', () => {
      const req: any = { header: () => undefined };

      let error: any;
      try {
        middleware.getToken(req);
      } catch (unauthorizedError) {
        error = unauthorizedError;
      }

      expect(error).toBeDefined();
      expect(error.response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should throw UNAUTHORIZED if token is not a Bearer token', () => {
      const notBearerToken = `Basic token`;
      const req: any = { header: () => notBearerToken };

      let error: any;
      try {
        middleware.getToken(req);
      } catch (unauthorizedError) {
        error = unauthorizedError;
      }

      expect(error).toBeDefined();
      expect(error.response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('verifyToken', () => {
    it('should return payload from valid token', async () => {
      const payload = { _id: 'dummyUserId', email: 'user@gmail.com' };
      const token = jwt.sign(payload);

      const decryptData = await middleware.verifyToken(token);
      expect(decryptData._id).toBe(payload._id);
      expect(decryptData.email).toBe(payload.email);
    });

    it('should throw UNAUTHORIZED if token has expired', async () => {
      const token = jwt.sign({}, { expiresIn: 0 });

      let error: any;
      try {
        await middleware.verifyToken(token);
      } catch (unauthorizedError) {
        error = unauthorizedError;
      }

      expect(error).toBeDefined();
      expect(error.response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should throw UNAUTHORIZED if an error occured', async () => {
      const verifyAsyncSpy = jest
        .spyOn(jwt, 'verifyAsync')
        .mockImplementation(() => {
          throw new UnauthorizedException();
        });

      let error: any;
      try {
        await middleware.verifyToken('token');
      } catch (unauthorizedError) {
        error = unauthorizedError;
      }

      expect(verifyAsyncSpy).toHaveBeenCalled();
      expect(error).toBeDefined();
      expect(error.response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });
});
