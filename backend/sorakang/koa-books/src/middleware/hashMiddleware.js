const bcrypt = require('bcrypt');
const { validator, errorHandler } = require('../libs');

const SALT = 10;

const hash = async (ctx, next) => {
  const { password } = ctx.request.body.userInfo;
  // password validation 숫자,특문 각각 1회 이상, 영문 2개 이상 8쟈리 이상 입력 가능

  if (!password) {
    // update user의 경우 pw 변경이 없을 수도 있으므로
    return next();
  }

  validator.passwordValidator(password);

  const bcryptPw = await bcrypt.hash(password, SALT);
  if (!bcryptPw) {
    throw new errorHandler.customError.ValidationError('유효하지 않은 password 입니다');
  }
  ctx.request.body.userInfo.password = bcryptPw;
  return next();
};

module.exports = { hash };
