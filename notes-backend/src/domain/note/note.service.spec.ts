import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { NoteService } from './note.service';
import { fullDTONote, notesList, fullEntityNote } from './test/fixtures';
import { NoteModelMock } from '../../../test/mocks';
import { BadRequestException, HttpStatus } from '@nestjs/common';

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
    it('should create note', async () => {
      jest.spyOn(service, 'create');
      const newNote = await service.create(fullDTONote);
      expect(newNote).toBeDefined();
      expect(newNote.title).toBe(fullDTONote.title);
      expect(newNote.content).toBe(fullDTONote.content);
      expect(newNote.important).toBe(fullDTONote.important);
      expect(service.create).toBeCalled();
    });

    xit('should throw BAD_REQUEST if error.code == 11000', async () => {
      const saveSpy = jest
        .spyOn(NoteModelMock.prototype, 'save')
        .mockImplementation(() => {
          throw new BadRequestException();
        });

      let error: any;
      try {
        await service.create(fullDTONote);
      } catch (badRequestError) {
        console.log(badRequestError);
        error = badRequestError;
      }
      expect(saveSpy).toBeCalled();
      expect(error.statusCode).toBe(HttpStatus.BAD_REQUEST);
      // TODO: testing de errores. No logro mockear constructor de modelo o método
    });
  });

  describe('findAll', () => {
    it('should return every note', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'find').mockImplementation(() => {
        return { exec: () => notesList };
      });
      const notes = await service.findAll();
      expect(notes).toBeDefined();
      expect(notes.length).toBe(notesList.length);
    });
  });

  describe('findOne', () => {
    it('should return specific note', async () => {
      jest
        .spyOn<any, any>(NoteModelMock, 'findById')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return fullEntityNote;
        });
      const note = await service.findOne('dummyId');
      expect(note).toBeDefined();
    });

    it('should throw NOT_FOUND exception if found note == null', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'findById').mockImplementation(() => {
        return null;
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
        .spyOn<any, any>(NoteModelMock, 'findById')
        .mockImplementation((id: string) => {
          expect(id).toBeDefined();
          return fullEntityNote;
        });
      // TODO: mock save method.
    });

    it('should throw NOT_FOUND exception if found note == null', async () => {
      jest.spyOn<any, any>(NoteModelMock, 'findById').mockImplementation(() => {
        return null;
      });

      let error: { response: any; status: number };
      try {
        await service.update('dummyId', fullDTONote);
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
          return fullEntityNote;
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
