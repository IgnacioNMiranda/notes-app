import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { mockClass, MockType } from '../../../test/mocks';
import { fullDTONote, fullEntityNote, notesList } from '../note/test/fixtures';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core/nest-application';
import { HttpStatus } from '@nestjs/common';

describe('NoteController', () => {
  let app: NestApplication;
  let controller: NoteController;
  let service: MockType<NoteService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteService,
        {
          provide: getModelToken('Note'),
          useValue: jest.fn(),
        },
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
        .post('/note/')
        .send(fullDTONote)
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
        .get('/note/')
        .expect(HttpStatus.OK);

      expect(service.findAll).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return status OK', async () => {
      service.findOne.mockImplementation((id) => {
        expect(id).toBeDefined();
        return fullEntityNote;
      });

      const response = await request(app.getHttpServer())
        .get('/note/1')
        .expect(HttpStatus.OK);

      expect(service.findOne).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });

  describe('update', () => {
    it('should return status ACCEPTED', async () => {
      const oldNote = { ...fullEntityNote };
      const newData = { ...fullEntityNote, title: 'new title' };

      service.update.mockImplementation((id, newData) => {
        expect(id).toBeDefined();
        expect(newData).toBeDefined();

        const updatedNote = { ...oldNote };
        Object.keys(newData).forEach((key) => {
          if (key !== '_id' && key !== '_v') {
            updatedNote[key] = newData[key];
          }
        });
        return updatedNote;
      });

      const response = await request(app.getHttpServer())
        .put('/note/610b061ef1f0ed2c0c590e29')
        .send(newData)
        .expect(HttpStatus.ACCEPTED);

      expect(service.update).toBeCalled();
      expect(response.body).toBeDefined();
      expect(response.body.title).toBe(newData.title);
    });
  });

  describe('remove', () => {
    it('should return status NO_CONTENT', async () => {
      service.update.mockImplementation((id) => {
        expect(id).toBeDefined();
      });

      const response = await request(app.getHttpServer())
        .delete('/note/610b061ef1f0ed2c0c590e29')
        .expect(HttpStatus.NO_CONTENT);

      expect(service.remove).toBeCalled();
      expect(response.body).toBeDefined();
    });
  });
});