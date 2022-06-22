const jwt = require('jsonwebtoken');
const { userQuery } = require('../repository');
const { util } = require('../common');

const { encrypt, errorHandling } = util;

const signUp = async (body) => {
  const {
    name,
    contact,
    email,
    password,
  } = body;

  const userInfo = await userQuery.getOneByInputData({ email });

  if (userInfo) {
    errorHandling.throwError(400, '이미 존재하는 이메일입니다.');
  }

  const encryptedPassword = await encrypt.hashPassword(password);

  const encryptedContact = encrypt.cipher(contact);

  await userQuery.createUser({
    name,
    contact: encryptedContact,
    email,
    password: encryptedPassword,
  });
};

const logIn = async (body) => {
  // TODO: 만약 관리자와 일반유저의 액세스토큰 유효기간을 분리하여 발급한다면?
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

const getAll = async () => {
  const userInfoList = await userQuery.getListAll();
  return userInfoList;
};

const getById = async (userId) => {
  const userInfo = await userQuery.getOneById(userId);

  if (!userInfo) {
    errorHandling.throwError(404, '해당 아이디의 유저정보가 존재하지 않습니다.');
  }

  const decryptContact = encrypt.decipher(userInfo.contact);
  userInfo.contact = decryptContact;

  return userInfo;
};

const deleteMyAccount = async (userId) => {
  await userQuery.deleteUser(userId);
};

module.exports = {
  signUp,
  logIn,
  getAll,
  getById,
  deleteMyAccount,
};
