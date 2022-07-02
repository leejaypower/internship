/* eslint-disable no-useless-catch */
const jwt = require('jsonwebtoken');
const { adminQuery } = require('../repository');
const { util, constants } = require('../common');

const { encrypt, errorHandler } = util;
const { ERROR_CODE } = constants;
const { CustomError } = errorHandler;

// 관리자 회원가입 요청에 해당하는 비지니스 로직
const signUp = async (body) => {
  /*
    TODO: 보안 강화 방안 생각해보기.
    관리자 회원가입 요청 시 점검사항
    1. 시크릿코드 일치여부 확인
    2. 이메일 중복여부 검사
  */
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

  const encryptedPassword = await encrypt.hashPassword(password); // 비밀번호 해시값 생성

  const createdAdminInfo = await adminQuery.createAdmin({
    email,
    password: encryptedPassword,
  });

  return createdAdminInfo;
};

// 관리자 로그인 요청에 해당하는 비지니스 로직
const logIn = async (body) => {
  // TODO: 만약 관리자와 일반유저의 액세스토큰 유효기간을 분리하여 발급한다면?
  // TODO: 중복로그인을 방지하기 위해서 어떻게 구현해야할까?
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

  const accessToken = jwt.sign(
    { id: adminInfo.id, role: 'admin' },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );

  /*
    중복로그인 방지 로직
    1. 1번 유저가 로그인하면, 액세스 토큰이 발급됨.
    2. 2번 유저가 로그인하면, 새롭게 액세스토큰이 발급되면서 기존의 액세스토큰에 대한 정보가 지워짐.(덮어쓰기)
    3. 미들웨어에서 액세스토큰이 유효한지 여부를 확인하는 과정을 통해, 1번 유저의 권한활동을 막음.
  */

  await adminQuery.updateAdmin(adminInfo.id, { accessToken });

  return accessToken;
};

// 관리자계정 정보조회 by adminId
const getOneByAdminId = async (adminId) => {
  if (!adminId) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const adminInfo = await adminQuery.getOneByInputData({ id: adminId });
  return adminInfo;
};

module.exports = {
  signUp,
  logIn,
  getOneByAdminId,
};
