import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NoteModule } from './domain/note/note.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { UserModule } from './domain/user/user.module';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
