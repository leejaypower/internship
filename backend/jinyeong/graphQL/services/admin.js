const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require('apollo-server-koa');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../common/util');
const { adminQuery } = require('../../repository');

// 관리자 회원가입 요청에 해당하는 비지니스 로직
const adminSignUp = async (email, password, secretCode) => {
  // 시크릿코드 일치여부 확인
  if (secretCode !== process.env.SECRET_CODE) {
    throw new ForbiddenError('해당 접근은 금지되었습니다.');
  }

  // 이메일 중복여부 검사
  const adminInfo = await adminQuery.getOneByInputData({ email });
  if (adminInfo) {
    throw new UserInputError('이미 존재하는 이메일입니다.');
  }

  const encryptedPassword = await encrypt.hashPassword(password); // 비밀번호 해시값 생성

  const createdAdminInfo = await adminQuery.createAdmin({
    email,
    password: encryptedPassword,
  });

  return createdAdminInfo;
};

const adminLogin = async (email, password) => {
  const adminInfo = await adminQuery.getOneByInputData({ email });
  if (!adminInfo) {
    throw new AuthenticationError('이메일을 다시 확인해주세요.');
  }

  const isPasswordMatched = await encrypt.comparePassword(password, adminInfo.password);
  if (!isPasswordMatched) {
    throw new AuthenticationError('비밀번호를 다시 확인해주세요');
  }

  const accessToken = jwt.sign({
    id: adminInfo.id,
    role: ['user', 'admin'],
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

  return accessToken;
};

module.exports = {
  adminSignUp,
  adminLogin,
};
