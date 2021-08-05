import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly notesRepository: ReturnModelType<typeof Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = new this.notesRepository(createNoteDto);
      await note.save();
      return note;
    } catch (error) {
      if (error?.code === 11000) {
        throw new BadRequestException(
          `'${createNoteDto.title}' already exists.`,
        );
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  findAll(): Promise<Note[]> {
    return this.notesRepository.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (note === null) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<any> {
    const note = await this.notesRepository.findById(id);
    if (note === null) {
      throw new NotFoundException('Note not found');
    }

    note.title = updateNoteDto.title || note.title;
    note.content = updateNoteDto.content || note.content;
    note.important = updateNoteDto.important || note.important;

    const updatedNote = await note.save();
    return updatedNote;
  }

  async remove(id: string) {
    const note = await this.notesRepository.findById(id);
    if (note === null) {
      throw new NotFoundException('Note not found');
    }
    await note.remove();
    return;
  }
}
