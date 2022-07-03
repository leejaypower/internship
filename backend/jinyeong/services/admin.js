/* eslint-disable no-useless-catch */
const jwt = require('jsonwebtoken');
const { adminQuery } = require('../repository');
const { util, constants } = require('../common');

const { encrypt, errorHandler } = util;
const { ERROR_CODE, AUTH_ROLE } = constants;
const { CustomError } = errorHandler;

const signUp = async (body) => {
  const { email, password, secretCode } = body;

  if (!email || !password || !secretCode) {
    throw new errorHandler.CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  // 시크릿코드 일치여부 확인
  if (secretCode !== process.env.SECRET_CODE) {
    throw new CustomError(ERROR_CODE.INVALID_ADMIN_SECRET_CODE);
  }

  // 이메일 중복여부 검사
  const adminInfo = await adminQuery.getOneByInputData({ email });

  if (adminInfo) {
    throw new CustomError(ERROR_CODE.SIGNUP_EMAIL_REDUPLICATED);
  }

  const encryptedPassword = await encrypt.hashPassword(password);

  const createdAdminInfo = await adminQuery.createAdmin({
    email,
    password: encryptedPassword,
  });

  return createdAdminInfo;
};

const logIn = async (body) => {
  /*
    비지니스 로직에서의 유효성 검사
    1. 해당 이메일의 관리자 정보가 DB에 실제로 존재하는지 조회
    2. 입력받은 비밀번호와 조회된 관리자 계정 비밀번호와의 일치여부 확인
  */
  const { email, password } = body;

  if (!email || !password) {
    throw new errorHandler.CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const adminInfo = await adminQuery.getOneByInputData({ email });

  if (!adminInfo) {
    throw new CustomError(ERROR_CODE.INVALID_LOGIN_ACCESS);
  }

  const isPasswordMatchedHash = await encrypt.comparePassword(password, adminInfo.password);

  if (!isPasswordMatchedHash) {
    throw new CustomError(ERROR_CODE.INVALID_LOGIN_ACCESS);
  }

  const accessToken = jwt.sign({
    id: adminInfo.id,
    role: [AUTH_ROLE.USER, AUTH_ROLE.ADMIN],
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

  await adminQuery.updateAdmin(adminInfo.id, { accessToken });

  return accessToken;
};

const getbyId = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const adminInfo = await adminQuery.getOneById(id);
  return adminInfo;
};

module.exports = {
  signUp,
  logIn,
  getbyId,
};
