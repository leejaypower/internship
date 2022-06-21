const { AuthenticationError } = require('apollo-server-koa');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../common/util');
const { userQuery } = require('../../repository');

const getOneByInputData = async (inputData) => {
  const userInfo = await userQuery.getOneByInputData(inputData);
  return userInfo;
};

const getMypage = async (userId) => {
  const userInfo = await userQuery.getOneById(userId);
  return userInfo;
};

const getAllByIds = async (ids) => {
  const userInfoList = await userQuery.getAllByIds(ids);
  return userInfoList;
};

const logIn = async (email, password) => {
  const userInfo = await userQuery.getOneByInputData({ email });
  if (!userInfo) {
    throw new AuthenticationError('이메일을 다시 확인해주세요.');
  }

  const isPasswordMatched = await encrypt.comparePassword(password, userInfo.password);
  if (!isPasswordMatched) {
    throw new AuthenticationError('비밀번호를 다시 확인해주세요');
  }

  const accessToken = jwt.sign({
    id: userInfo.id,
    role: ['user'],
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

  return accessToken;
};

const signUp = async (body) => {
  const {
    email,
    password,
    name,
    contact,
  } = body;

  const encryptedPassword = await encrypt.hashPassword(password);
  const encryptedContact = encrypt.cipher(contact);

  const createdUserInfo = await userQuery.createUser({
    email,
    password: encryptedPassword,
    name,
    contact: encryptedContact,
  });

  return createdUserInfo;
};

module.exports = {
  getOneByInputData,
  getMypage,
  getAllByIds,
  signUp,
  logIn,
};
