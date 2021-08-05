import { Type } from '@nestjs/common';
import { CreateNoteDto } from '../src/domain/note/dto/create-note.dto';

export type MockType<T> = {
  [K in keyof T]?: jest.Mock;
};

export function mockClass<T>(clazz: Type<T>): MockType<T> {
  const mockValue: MockType<T> = {};
  Reflect.ownKeys(clazz.prototype)
    .filter((key) => key !== 'constructor')
    .forEach((key) => (mockValue[key as any] = jest.fn()));

  return { ...mockValue };
}

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
  remove = () => jest.fn().mockImplementation(() => ({}));
}
