import { Module } from '@nestjs/common';
import { NoteService } from './providers/note.service';
import { NoteController } from './controllers/note.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Note } from './entities/note.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypegooseModule.forFeature([Note, User])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
