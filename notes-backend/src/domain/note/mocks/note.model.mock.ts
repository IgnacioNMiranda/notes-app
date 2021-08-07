import { CreateNoteDto } from '../dto/create-note.dto';

export class NoteModelMock {
  title: string;
  content: string;
  important: boolean;
  userId: string;

  constructor(createNoteDto: CreateNoteDto) {
    this.title = createNoteDto.title;
    this.content = createNoteDto.content;
    this.important = createNoteDto.important;
    this.userId = createNoteDto.userId;
  }

  public save = () => jest.fn().mockImplementation(() => ({}));
  static find = () => jest.fn();
  static findById = () => jest.fn();
  remove = () => jest.fn().mockImplementation(() => ({}));
}
