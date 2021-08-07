import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  let util: CryptoUtil;

  beforeEach(() => {
    util = new CryptoUtil();
  });

  it('should be defined', () => {
    expect(util).toBeDefined();
  });

  describe('encrypt', () => {
    it('should encrypt received value', async () => {
      const password = 'pass123';
      const cryptedPassword = await util.encrypt(password);
      expect(password).not.toBe(cryptedPassword);
    });
  });
});
