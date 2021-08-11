import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { NoteService } from './note.service';
import {
  fullCreateNoteDTO,
  notesList,
  fullNoteEntity,
  fullUpdateNoteDTO,
} from '../fixtures';
import { NoteModelMock } from '../mocks/note.model.mock';
import { UserModelMock } from '../../user/mocks/user.model.mock';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { fullUserEntity } from '../../user/fixtures';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: getModelToken('Note'),
          useValue: NoteModelMock,
        },
        {
          provide: getModelToken('User'),
          useValue: UserModelMock,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a note', async () => {
      const findUserByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation(() => {
          return fullUserEntity;
        });

      const newNote = await service.create('dummyUserId', fullCreateNoteDTO);
      expect(newNote).toBeDefined();
      expect(newNote.title).toBe(fullCreateNoteDTO.title);
      expect(newNote.content).toBe(fullCreateNoteDTO.content);
      expect(newNote.important).toBe(fullCreateNoteDTO.important);
      expect(newNote.user).toEqual(fullUserEntity);
      expect(findUserByIdSpy).toBeCalled();
    });

    it(`should throw BAD_REQUEST if note's user is not found`, async () => {
      const findByIdSpy = jest
        .spyOn<any, any>(UserModelMock, 'findById')
        .mockImplementation(() => {
          return null;
        });

      let error: any;
      try {
        await service.create('dummyUserId', fullCreateNoteDTO);
      } catch (badRequestError) {
        error = badRequestError;
      }

      expect(findByIdSpy).toBeCalled();
      expect(error).toBeDefined();
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });

    // TODO: testing de errores. No logro mockear constructor de modelo o método
    xit('should throw BAD_REQUEST if title is duplicated', async () => {
      const saveSpy = jest
        .spyOn(NoteModelMock.prototype, 'save')
        .mockImplementation(() => {
          throw new BadRequestException();
        });

      let error: any;
      try {
        await service.create('dummyUserId', fullCreateNoteDTO);
      } catch (badRequestError) {
        error = badRequestError;
      }
      expect(saveSpy).toBeCalled();
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('findAll', () => {
    it('should return every note', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'find').mockImplementation(() => {
        return { populate: () => ({ exec: () => notesList }) };
      });
      const notes = await service.findAll();
      expect(notes).toBeDefined();
      expect(notes.length).toBe(notesList.length);
    });
  });

  describe('findOne', () => {
    it('should return specific note', async () => {
      jest
        .spyOn<any, any>(NoteModelMock, 'findOne')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return { populate: () => ({ exec: () => fullNoteEntity }) };
        });

      const note = await service.findOne('dummyId');
      expect(note).toBeDefined();
    });

    it('should throw NOT_FOUND exception if found note == null', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'findOne').mockImplementation(() => {
        return { populate: () => ({ exec: () => null }) };
      });

      let error: { response: any; status: number };
      try {
        await service.findOne('dummyId');
      } catch (notFoundError) {
        error = notFoundError;
      }
      expect(error).toBeDefined();
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('update', () => {
    xit('should update note and return updated note', async () => {
      jest
        .spyOn<any, any>(NoteModelMock, 'findOne')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return { populate: () => ({ exec: () => fullNoteEntity }) };
        });
      // TODO: mock save method.
    });

    it('should throw NOT_FOUND exception if found note == null', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'findOne').mockImplementation(() => {
        return { populate: () => ({ exec: () => null }) };
      });

      let error: { response: any; status: number };
      try {
        await service.update('dummyId', fullUpdateNoteDTO);
      } catch (notFoundError) {
        error = notFoundError;
      }
      expect(error).toBeDefined();
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('remove', () => {
    xit('should remove note and return', async () => {
      jest
        .spyOn<any, any>(NoteModelMock, 'findById')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return fullNoteEntity;
        });
      // TODO: mock de método non-static remove.
      await service.remove('dummyId');
      expect(NoteModelMock.findById).toBeCalled();
    });

    it('should throw NOT_FOUND exception if found note == null', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'findById').mockImplementation(() => {
        return null;
      });

      let error: { response: any; status: number };
      try {
        await service.remove('dummyId');
      } catch (notFoundError) {
        error = notFoundError;
      }
      expect(error).toBeDefined();
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
