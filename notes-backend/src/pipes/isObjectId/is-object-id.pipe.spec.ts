import { HttpStatus } from '@nestjs/common';
import { IsObjectIdPipe } from './is-object-id.pipe';

describe('IsObjectIdPipe', () => {
  let pipe: IsObjectIdPipe;

  beforeEach(() => {
    pipe = new IsObjectIdPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return same value if id is a valid ObjectId', () => {
      const id = '610b061ef1f0ed2c0c590e29';
      const transformedId = pipe.transform(id, {
        type: 'param',
        metatype: String,
        data: 'id',
      });
      expect(transformedId).toBe(id);
    });

    it('should throw BAD_REQUEST if id is invalid', () => {
      let error: any;
      try {
        pipe.transform('1', { type: 'param', metatype: String, data: 'id' });
      } catch (badRequestError) {
        error = badRequestError;
      }
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should throw BAD_REQUEST if value is falsy', () => {
      let error: any;
      try {
        pipe.transform(null, { type: 'param', metatype: String, data: 'id' });
      } catch (badRequestError) {
        error = badRequestError;
      }
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should throw BAD_REQUEST if metadata is falsy', () => {
      let error: any;
      try {
        pipe.transform('1', null);
      } catch (badRequestError) {
        error = badRequestError;
      }
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
