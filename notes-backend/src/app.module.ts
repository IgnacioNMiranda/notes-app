import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { NoteModule } from './domain/note/note.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { UserController } from './domain/user/controllers/user.controller';
import { NoteController } from './domain/note/controllers/note.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    NoteModule,
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'notes', method: RequestMethod.GET },
        { path: 'notes/:id', method: RequestMethod.GET },
      )
      .forRoutes(UserController, NoteController);
  }
}
