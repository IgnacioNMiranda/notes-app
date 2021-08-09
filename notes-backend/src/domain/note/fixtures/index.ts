import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

export const fullCreateNoteDTO: CreateNoteDto = {
  title: 'title',
  content: 'content',
  important: true,
};

export const fullUpdateNoteDTO: UpdateNoteDto = {
  title: 'updated title',
  content: 'new updated content',
  important: true,
};

export const fullNoteEntity = {
  date: new Date('2021-08-04T21:26:49.423Z'),
  _id: '610b061ef1f0ed2c0c590e29',
  title: 'Big title',
  content: 'Dummy content',
  important: true,
  userId: '610b061ef1f0ed2c0c590e29',
  __v: 0,
};

export const notesList = [
  {
    date: new Date('2021-08-04T21:26:49.423Z'),
    _id: '610b061ef1f0ed2c0c590e29',
    title: 'Test title',
    content: 'Test content',
    important: true,
    userId: '610b061ef1f0ed2c0c590e29',
    __v: 0,
  },
  {
    date: new Date('2021-08-04T21:26:49.423Z'),
    _id: '610b061ef1f0ed2c0c590e27',
    title: 'Test title 2',
    content: 'Test content',
    important: false,
    userId: '610b061ef1f0ed2c0c590e29',
    __v: 0,
  },
];
