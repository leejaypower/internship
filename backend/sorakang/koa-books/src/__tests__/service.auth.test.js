/**
 * service.auth.getAccessToken test
 * TEST
 * 1. Decode를 검증합니다 (verifyTokenWrapper)
 * 2. Database의 와 Decode가 같은지 확인합니다
 * 2. AccessToken의 발급을 확인합니다.
 *
 * unhappy : UnauthenticatedError
 * happy : AccessToken 발급
 */

const jwt = require('jsonwebtoken');
const tokenFunc = require('../libs/auth/tokenFunc');
const { errorHandler } = require('../libs');
const authRepository = require('../repositories/authRepository');
const authUtils = require('../libs/auth');

// test module
const { getAccessToken } = require('../services/auth');

// test에 사용될 constant
const rToken = 'testToken';
const newToken = 'NewToken';
const decode = {
  userId: 22,
  groupName: 'admin',
  iat: 1656676742498,
  exp: 1656687542498,
};

// test에 사용될 Mock functions

// jwt package mocking
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'TOKEN'),
  verify: jest.fn(() => 'verify'),
}));

// authRepository mock
jest.mock('../repositories/authRepository', () => ({
  verifyAuth: jest.fn(() => ({ iat: { iat: '1656676742498' } })),
}));

// authUtils mock
jest.mock('../libs/auth', () => ({
  tokenFunc: {
    verifyTokenWrapper: jest.fn(() => decode),
    getToken: jest.fn(() => newToken),
  },
}));

// Test
describe('Refresh Token을 검증하고 새로운 Access Token을 발급합니다', () => {
  describe('1. Refresh Token을 검증합니다', () => {
    beforeAll(() => authUtils.tokenFunc.verifyTokenWrapper.mockImplementation(() => undefined));

    it('유저의 Refresh token이 사용 불가능 하다면 UnauthenticatedError 가 throw 되어야 합니다', async () => {
      try {
        await getAccessToken(rToken);
      } catch (e) {
        expect(e instanceof errorHandler.customError.UnauthenticatedError).toBe(true);
        expect(e.message).toBe('Token이 없거나 적절하지 않습니다 : 다시 로그인 해주세요');
      }
    });
  });

  describe('2. Decode된 객체의 iat와 database login info Table의 iat를 검증합니다', () => {
    describe('2-1. 로그인 되어있지 않았다면(!iat) UnauthenticatedError 가 throw 되어야 합니다', () => {
      beforeAll(() => {
        authRepository.verifyAuth.mockImplementation(() => ({ iat: { iat: undefined } }));
      });

      it('로그인 되어있지 않았다면(!iat) UnauthenticatedError 가 throw 되어야 합니다', async () => {
        try {
          await getAccessToken(rToken);
        } catch (e) {
          expect(e instanceof errorHandler.customError.UnauthenticatedError).toBe(true);
          expect(e.message).toBe('Token이 없거나 적절하지 않습니다 : 다시 로그인 해주세요');
        }
      });
    });

    describe('2-2. Decode한 객체의 iat와 database의 iat가 다르면 UnauthenticatedError 가 throw 되어야 합니다', () => {
      const decodeObj = {
        userId: 22,
        groupName: 'admin',
        iat: 1656676741111,
        exp: 1656687542498,
      };
      beforeAll(() => authUtils.tokenFunc.verifyTokenWrapper.mockImplementation(() => decodeObj));

      it('Decode한 객체의 iat와 database의 iat가 다르면 UnauthenticatedError 가 throw 되어야 합니다', async () => {
        try {
          await getAccessToken(rToken);
        } catch (e) {
          expect(e instanceof errorHandler.customError.UnauthenticatedError).toBe(true);
          expect(e.message).toBe('Token이 없거나 적절하지 않습니다 : 다시 로그인 해주세요');
        }
      });
    });
  });

  describe('3. AccessToken을 발급합니다', () => {
    beforeAll(() => {
      authUtils.tokenFunc.getToken(() => newToken),
      authRepository.verifyAuth.mockImplementation(() => ({ iat: { iat: '1656676742498' } })),
      authUtils.tokenFunc.verifyTokenWrapper.mockImplementation(() => decode);
    });

    it(' AccessToken을 발급합니다', async () => {
      const { accessToken } = await getAccessToken(rToken);
      console.log('accessToken', accessToken);
      expect(accessToken).toBe(newToken);
    });
  });
});
