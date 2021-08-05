import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypegooseModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
