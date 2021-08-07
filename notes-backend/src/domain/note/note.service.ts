import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../user/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly notesRepository: ReturnModelType<typeof Note>,
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof User>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const { userId } = createNoteDto;

    const user = await this.userRepository.findById(userId);
    if (user === null) {
      throw new BadRequestException(`Does not exist a user with ${userId} id`);
    }

    try {
      const note = new this.notesRepository(createNoteDto);
      note.user = user;
      const savedNote = await note.save();
      return savedNote;
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(
          `'${createNoteDto.title}' title already exists.`,
        );
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  findAll(): Promise<Note[]> {
    return this.notesRepository.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository
      .findOne({ _id: id })
      .populate('user')
      .exec();
    if (note === null) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<any> {
    const note = await this.notesRepository
      .findOne({ _id: id })
      .populate('user')
      .exec();
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
