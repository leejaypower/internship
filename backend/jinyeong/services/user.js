/* eslint-disable object-curly-newline */
const jwt = require('jsonwebtoken'); // jwt 토큰(액세스 토큰을 만들기 위해 사용)
const { userQuery } = require('../repository');
const { util } = require('../common'); // 암호화 및 복호화에 사용

const { encrypt, errorHandling } = util;

// 회원가입 요청에 해당하는 비지니스 로직
const signUp = async (body) => {
  const { name, contact, email, password } = body;

  // 이메일 중복여부 검사
  const userInfo = await userQuery.getOneByInputData({ email });

  if (userInfo) {
    errorHandling.throwError(400, '이미 존재하는 이메일입니다.');
  }

  const encryptedPassword = await encrypt.hashPassword(password); // 비밀번호 해시값 생성

  const encryptedContact = encrypt.cipher(contact); // 연락처 암호화

  const inputData = { name, contact: encryptedContact, email, password: encryptedPassword };

  await userQuery.createOne(inputData);
};

// 로그인 요청에 해당하는 비지니스 로직
const logIn = async (body) => {
  // TODO: 만약 관리자와 일반유저의 액세스토큰 유효기간을 분리하여 발급한다면?
  /*
    비지니스 로직에서의 유효성 검사
    1. 해당 이메일의 유저정보가 DB에 실제로 존재하는지 조회
    2. 입력받은 비밀번호와 조회된 계정 비밀번호와의 일치여부 확인
  */
  const { email, password } = body;

  const userInfo = await userQuery.getOneByInputData({ email });

  if (!userInfo) {
    errorHandling.throwError(400, '해당 이메일의 유저정보는 없습니다.');
  }

  const isPasswordMatchedHash = await encrypt.comparePassword(password, userInfo.password);

  if (!isPasswordMatchedHash) {
    errorHandling.throwError(401, '비밀번호를 다시 확인해주세요.');
  }

  // 액세스토큰, 유효시간 30분
  const accessToken = jwt.sign({
    id: userInfo.id,
    role: 'user',
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
  return { accessToken };
};

// 전체 유저정보 조회
const searchAll = async () => {
  const userInfoList = await userQuery.getAll();

  return userInfoList.map((userInfo) => { // 유저 아이디, 이름, 이메일, 블랙리스트 여부만 추출
    const seletedUserInfo = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      isBlacklist: userInfo.isBlacklist,
    };
    return seletedUserInfo;
  });
};

// 유저아이디를 통한 유저정보 조회
const searchByUserId = async (userId) => {
  const userInfo = await userQuery.getOneByInputData({ id: userId });

  if (!userInfo) {
    errorHandling.throwError(404, '해당 아이디의 유저정보가 존재하지 않습니다.');
  }

  const decryptContact = encrypt.decipher(userInfo.contact);
  userInfo.contact = decryptContact;

  return userInfo;
};

// 유저아이디를 통한 유저정보 삭제
const eliminateUserInfoByUserId = async (userId) => {
  await userQuery.deleteOneByUserId(userId);
};

module.exports = {
  signUp,
  logIn,
  searchAll,
  searchByUserId,
  eliminateUserInfoByUserId,
};
