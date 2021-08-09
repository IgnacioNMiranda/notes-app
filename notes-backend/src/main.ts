import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const env = configService.get('env');

  const origins = [];
  if (env === 'development') {
    origins.push('http://localhost:3001');
  }

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  await app.listen(port);
}
bootstrap();
