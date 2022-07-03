const { errorHandler, validator } = require('../libs');

/** Validator test
 * email validator test
 */

const happy = 'sora@naver.com';
const unhappy = 'barogo#baro.co.kr';

describe('email validator를 test합니다', () => {
  // happy
  it('true를 return해야 합니다', () => {
    expect(validator.emailValidator(happy)).toBe(true);
  });

  // unhappy
  it('일치하지 않으면 Validation Error가 throw되어야 합니다.', () => {
    try {
      validator.emailValidator(unhappy);
    } catch (e) {
      expect(e instanceof errorHandler.customError.ValidationError).toBe(true);
      expect(e.message).toBe('입력값이 유효하지 않습니다 : 유효하지 않은 email 입니다');
    }
  });
});
// cursor, password 까지 추가하기
