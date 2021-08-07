import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { mockClass, MockType } from '../../../test/mocks';
import {
  fullCreateNoteDTO,
  fullNoteEntity,
  fullUpdateNoteDTO,
  notesList,
} from './fixtures';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core/nest-application';
import { HttpStatus } from '@nestjs/common';
import { IsObjectIdPipe } from '../../pipes';

describe('NoteController', () => {
  let app: NestApplication;
  let controller: NoteController;
  let service: MockType<NoteService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: mockClass(NoteService),
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get(NoteService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(IsObjectIdPipe.prototype, 'transform')
      .mockImplementation((value) => value);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return status CREATED', async () => {
      service.create.mockImplementation((note) => {
        expect(note.title).toBeDefined();
        expect(note.content).toBeDefined();
        expect(note.date).toBeUndefined();
        expect(note.important).toBeDefined();
        return note;
      });

      await request(app.getHttpServer())
        .post('/notes/')
        .send(fullCreateNoteDTO)
        .expect(HttpStatus.CREATED);

      expect(service.create).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('should return status OK', async () => {
      service.findAll.mockImplementation(() => {
        return notesList;
      });

      const response = await request(app.getHttpServer())
        .get('/notes/')
        .expect(HttpStatus.OK);

      expect(service.findAll).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return status OK when id is valid', async () => {
      service.findOne.mockImplementation((id) => {
        expect(id).toBeDefined();
        return fullNoteEntity;
      });

      const response = await request(app.getHttpServer())
        .get('/notes/1')
        .expect(HttpStatus.OK);

      expect(service.findOne).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });

  describe('update', () => {
    it('should return status OK when note entity and id are valid', async () => {
      const oldNote = { ...fullNoteEntity };
      const newData = { ...fullUpdateNoteDTO };

      service.update.mockImplementation((id, newData) => {
        expect(id).toBeDefined();
        expect(newData).toBeDefined();

        const updatedNote = { ...oldNote };
        Object.keys(newData).forEach((key) => {
          updatedNote[key] = newData[key];
        });
        return updatedNote;
      });

      const response = await request(app.getHttpServer())
        .put('/notes/1')
        .send(newData)
        .expect(HttpStatus.OK);

      expect(service.update).toBeCalled();
      expect(response.body).toBeDefined();
      expect(response.body.title).toBe(newData.title);
    });
  });

  describe('remove', () => {
    it('should return status NO_CONTENT', async () => {
      service.remove.mockImplementation((id) => {
        expect(id).toBeDefined();
      });

      const response = await request(app.getHttpServer())
        .delete('/notes/1')
        .expect(HttpStatus.NO_CONTENT);

      expect(service.remove).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });
});
