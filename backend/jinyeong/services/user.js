const jwt = require('jsonwebtoken');
const { userQuery } = require('../repository');
const { util, constants } = require('../common');

const { encrypt, errorHandler } = util;
const { ERROR_CODE, AUTH_ROLE } = constants;
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
    role: [AUTH_ROLE.USER],
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

  await userQuery.updateUser(userInfo.id, { accessToken });

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

  return userInfo;
};

const getOneByInputData = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await userQuery.getOneByInputData(inputData);
  return userInfo;
};

module.exports = {
  signUp,
  logIn,
  getAll,
  getAllByIds,
  getById,
  getOneByInputData,
};
