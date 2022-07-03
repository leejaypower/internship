const jwt = require('jsonwebtoken');
const { customError } = require('../libs/error');

// test module
const { verifyTokenWrapper } = require('../libs/auth/tokenFunc');

// jwt package mocking
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'TOKEN'),
  verify: jest.fn(() => 'VERIFY'),
}));

const token = 'accessToken';
const key = 'key';
const decode = {
  userId: 22,
  groupName: 'admin',
  iat: 1656676742498,
  exp: 1656687542498,
};

/**
 * lib.token.verifyTokenWrapper test
 * TEST
 * 1. accessToken의 decoding을 검증합니다
 *
 * unhappy : UnauthenticatedError
 * happy : decode token발급
 */

describe('1. Token을 검증하는 verifyTokenWrapper를 TEST 합니다', () => {
  describe('1-1. 만료된 Token의 경우 UnauthenticatedError를 Throw 합니다', () => {
    beforeAll(() => jwt.verify.mockImplementation(() => {
      throw new customError.UnauthenticatedError('Token이 만료되었습니다');
    }));

    it('만료된 Token의 경우 UnauthenticatedError를 Throw 합니다', async () => {
      try {
        await verifyTokenWrapper(token, key);
      } catch (e) {
        expect(e instanceof customError.UnauthenticatedError).toBe(true);
        expect(e.message).toBe('Token이 없거나 적절하지 않습니다 : Token이 만료되었습니다');
      }
    });
  });

  describe('1-2. Token이 정상적으로 decode된다면 decode된 token을 반환합니다', () => {
    beforeAll(() => jwt.verify.mockImplementation(() => decode));

    it('만료된 Token의 경우 UnauthenticatedError를 Throw 합니다', async () => {
      const decodeToken = await verifyTokenWrapper(token, key);

      expect(decodeToken).toBe(decode);
      expect(jwt.verify).toHaveBeenCalledTimes(2);
    });
  });
});
