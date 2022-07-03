const repository = require('../repository');
const lib = require('../lib');

const { constant } = lib.common;
const { jwt, hash } = lib.auth;
const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

/**
 * 유저 회원가입
 * @param { Object } userData 유저 email, name, password
 */
const createUser = async (userData) => {
  const { name, email, password } = userData;
  const emailCheck = await repository.user.getUserByEmail(email);
  if (emailCheck) {
    throw new CustomError(errorCode.alreadyExist, '[src/service/user.js]');
  }

  const newUserData = await repository.user.createUser({
    name,
    email,
    password,
  });

  newUserData.password = undefined;
  return newUserData;
};

const getUsers = async (userQuery) => {
  const userList = await repository.user.getUsers(userQuery);
  return userList;
};

const getUserById = async (id) => {
  const user = await repository.user.getUserById(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await repository.user.getUserByEmail(email);
  return user;
};

const updateUserName = async (id, name) => {
  const numOfUpdatedRow = await repository.user.updateUserName(id, name);
  return numOfUpdatedRow;
};

/**
 * 유저 로그인
 * @param { String } email 유저의 이메일
 * @param { String} password 유저의 패스워드
 */
const signIn = async (email, password) => {
  const matchedUser = await repository.user.getUserByEmail(email);
  if (matchedUser.email !== email) {
    throw new CustomError(errorCode.noDataExist, '[src/service/user.js]');
  }

  const matchPassword = await hash.comparePassword(password, matchedUser.password);
  if (!matchPassword) {
    throw new CustomError(errorCode.loginFailed, '[src/service/user.js]');
  }

  const token = jwt.sign({
    id: matchedUser.dataValues.id,
    email,
    role: constant.role.user,
  }, {
    expiresIn: constant.token.expiresIn,
  });

  return token;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserName,
  signIn,
};
