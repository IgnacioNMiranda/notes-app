import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { NoteService } from '../providers/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { IsObjectIdPipe } from '../../../pipes';
import { Request } from 'express';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(req.user?._id, createNoteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new IsObjectIdPipe()) id: string) {
    return this.noteService.findOne(id);
  }

  @Get('user/notes')
  @HttpCode(HttpStatus.OK)
  findByUserId(@Req() req: Request) {
    return this.noteService.findByUserId(req.user?._id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new IsObjectIdPipe()) id: string) {
    return this.noteService.remove(id);
  }
}
