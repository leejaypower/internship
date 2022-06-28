const repository = require('../repository');
const { sequelize } = require('../db/models');
const lib = require('../../lib');

const { constant } = lib.common;
const { errorHandler } = lib.util.error;

/**
 * 유저 회원가입
 * @param { Object } userData 유저 email, name, password
 */
const createUser = async (userData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const { name, email, password } = userData;
    const emailCheck = await repository.user.getUserByEmail(email, { transaction });
    if (emailCheck) {
      errorHandler(1, 'This email already exist');
    }

    const newUserData = await repository.user.createUser({
      name,
      email,
      password,
    }, {
      transaction,
    });
    newUserData.password = undefined;
    return newUserData;
  });
  return result;
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
    errorHandler(1, 'User email does not exist.');
  }

  const matchPassword = await lib.auth.hash.comparePassword(password, matchedUser.password);
  if (!matchPassword) {
    errorHandler(1, 'Wrong password');
  }

  const token = lib.auth.jwt.sign({
    id: matchedUser.dataValues.id,
    email,
    role: constant.ROLE.USER,
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
