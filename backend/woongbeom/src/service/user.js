const repository = require('../repository');
const { sequelize } = require('../db/models');
const { errorHandler } = require('../../lib/util/error');
const lib = require('../../lib');

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

const updateUserName = async (id, name) => {
  const numOfUpdatedRow = await repository.user.updateUserName(id, name);
  return numOfUpdatedRow;
};

const getUserByEmail = async (email) => {
  const user = await repository.user.getUserByEmail(email);
  return user;
};

const signIn = async (email, password) => {
  const matchedUser = await repository.user.getUserByEmail(email);
  if (matchedUser.email !== email) {
    lib.util.error.errorHandler(1, 'User email does not exist.');
  }
  const matchPassword = await lib.auth.hash.comparePassword(password, matchedUser.password);
  if (!matchPassword) {
    lib.util.error.errorHandler(1, 'Wrong password');
  }
  const token = lib.auth.jwt.sign({ email }, { expiresIn: lib.common.constant.token.expiresIn });
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
