const jwt = require('jsonwebtoken');
const { userQuery } = require('../repository');
const { util, constants } = require('../common');

const { encrypt, errorHandler } = util;
const { ERROR_CODE } = constants;
const { CustomError } = errorHandler;

const signUp = async (body) => {
  const {
    name,
    contact,
    email,
    password,
  } = body;

  if (!name || !contact || !email || !password) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const userInfo = await userQuery.getOneByInputData({ email });

  if (userInfo) {
    throw new CustomError(ERROR_CODE.SIGNUP_EMAIL_REDUPLICATED);
  }

  const encryptedPassword = await encrypt.hashPassword(password);

  const encryptedContact = encrypt.cipher(contact);

  const createdUserInfo = await userQuery.createUser({
    name,
    contact: encryptedContact,
    email,
    password: encryptedPassword,
  });

  return createdUserInfo;
};

const logIn = async (body) => {
  // TODO: 만약 관리자와 일반유저의 액세스토큰 유효기간을 분리하여 발급한다면?
  const { email, password } = body;

  if (!email || !password) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const userInfo = await userQuery.getOneByInputData({ email });

  if (!userInfo) {
    throw new CustomError(ERROR_CODE.INVALID_LOGIN_ACCESS);
  }

  const isPasswordMatchedHash = await encrypt.comparePassword(password, userInfo.password);

  if (!isPasswordMatchedHash) {
    throw new CustomError(ERROR_CODE.INVALID_LOGIN_ACCESS);
  }

  // 액세스토큰, 유효시간 30분
  const accessToken = jwt.sign({
    id: userInfo.id,
    role: 'user',
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

  return accessToken;
};

const getAll = async () => {
  const userInfoList = await userQuery.getListAll();
  return userInfoList;
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfoList = await userQuery.getAllByIds(ids);
  return userInfoList;
};

const getById = async (userId) => {
  if (!userId) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await userQuery.getOneById(userId);

  if (!userInfo) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  const decryptContact = encrypt.decipher(userInfo.contact);
  userInfo.contact = decryptContact;

  return userInfo;
};

const getOneByInputData = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await userQuery.getOneByInputData(inputData);
  return userInfo;
};

const getMypage = async (userId) => {
  if (!userId) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await userQuery.getOneById(userId);
  return userInfo;
};

const deleteMyAccount = async (userId) => {
  if (!userId) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await userQuery.deleteUser(userId);
};

module.exports = {
  signUp,
  logIn,
  getAll,
  getAllByIds,
  getById,
  getOneByInputData,
  getMypage,
  deleteMyAccount,
};
