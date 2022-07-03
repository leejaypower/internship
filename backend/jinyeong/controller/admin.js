const { adminService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

// 유효성 검사 정규표현식
const emailValidation = /^(?=^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+).{12,30}$/; // 이메일(12~30)
const passwordValidation = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/; // 비밀번호(8~16)

const signUp = async (ctx) => {
  const { body } = ctx.request;

  // NOTE: secretCode란, 관리자 여부를 확인하는 비밀코드입니다.
  const { email, password, secretCode } = body;

  if (!email || !password || !secretCode) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  if (!emailValidation.test(email)) {
    throw new CustomError(ERROR_CODE.INVALID_EMAIL_REGEX);
  }
  if (!passwordValidation.test(password)) {
    throw new CustomError(ERROR_CODE.INVALID_PASSWORD_REGEX);
  }

  const result = await adminService.signUp({ email, password, secretCode });

  ctx.body = restApiResponse(201, result);
  ctx.status = 201;
};

const logIn = async (ctx) => {
  /*
    로그인 요청 시 사전 유효성 검증
    1. 이메일과 비밀번호를 모두 입력받았는지?
    2. 이메일과 비밀번호의 형식이 유효한지?
  */
  const { body } = ctx.request;
  const { email, password } = body;

  if (!email || !password) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  if (!emailValidation.test(email)) {
    throw new CustomError(ERROR_CODE.INVALID_EMAIL_REGEX);
  }
  if (!passwordValidation.test(password)) {
    throw new CustomError(ERROR_CODE.INVALID_PASSWORD_REGEX);
  }

  const accessToken = await adminService.logIn({ email, password });

  ctx.body = restApiResponse(200, { accessToken });
};

module.exports = {
  signUp,
  logIn,
};
