import { CreateNoteDto } from '../dto/create-note.dto';

export class NoteModelMock {
  title: string;
  content: string;
  important: boolean;

  constructor(createNoteDto: CreateNoteDto) {
    this.title = createNoteDto.title;
    this.content = createNoteDto.content;
    this.important = createNoteDto.important;
  }

  public save = () => jest.fn().mockImplementation(() => ({}));
  static find = () => jest.fn();
  static findById = () => jest.fn();
  static findOne = () => jest.fn();
  remove = () => jest.fn().mockImplementation(() => ({}));
}
