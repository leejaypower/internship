const { userService } = require('../services');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

// 유효성 검사 정규표현식
const emailValidation = /^(?=^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+).{12,30}$/; // 이메일(12~30)
const passwordValidation = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/; // 비밀번호(8~16)
const contactValidation = /^\d{2,3}[-.]?\d{3,4}[-.]?\d{4}$/; // 연락처(9~11)
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const signUp = async (ctx) => {
  const { body } = ctx.request;

  const {
    name,
    contact,
    email,
    password,
  } = body;

  if (!name || !contact || !email || !password) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  if (!emailValidation.test(email)) {
    throw new CustomError(ERROR_CODE.INVALID_EMAIL_REGEX);
  }
  if (!passwordValidation.test(password)) {
    throw new CustomError(ERROR_CODE.INVALID_PASSWORD_REGEX);
  }
  if (!contactValidation.test(contact)) {
    throw new CustomError(ERROR_CODE.INVALID_CONTACT_REGEX);
  }

  await userService.signUp({
    name,
    email,
    password,
    contact,
  });

  ctx.status = 201;
};

const logIn = async (ctx) => {
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

  const accessToken = await userService.logIn({ email, password });

  ctx.body = { accessToken };
};

const getAll = async (ctx) => {
  const result = await userService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = result;
};

// 관리자 계정이 특정 유저정보를 조회하는 요청
const getById = async (ctx) => {
  const { params } = ctx.request;

  const userId = params.user_id;

  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await userService.getById(userId);
  ctx.body = result;
};

module.exports = {
  signUp,
  logIn,
  getAll,
  getById,
};
