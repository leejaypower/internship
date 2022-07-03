const { customError } = require('../error');

const cursorValidator = (cursor) => {
  // "숫자-숫자" 형식임을 확인
  const regExp = /^\d+\-\d+$/;

  if (!regExp.test(cursor)) {
    throw new customError.ValidationError('유효하지 않은 cursor값 입니다');
  }

  const cursorArray = cursor.split('-');
  const validCursor = new Date(Number(cursorArray[0]));
  const id = Number(cursorArray[1]);

  return { validCursor, id };
};

const emailValidator = (email) => {
  const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!emailRegExp.test(email)) {
    throw new customError.ValidationError('유효하지 않은 email 입니다');
  }
};

const passwordValidator = (password) => {
  // 숫자,특문 각각 1회 이상, 영문 2개 이상 8쟈리 이상 입력 가능
  const passwordRegExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

  if (!passwordRegExpPw.test(password)) {
    throw new customError.ValidationError('유효하지 않은 password 입니다');
  }
};

module.exports = { cursorValidator, emailValidator, passwordValidator };
