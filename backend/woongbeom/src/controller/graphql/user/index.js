const repository = require('../../../repository');

const createUser = async (userData) => {
  const result = await repository.user.createUser(userData);
  return result;
};

const getUsers = async (userQuery) => {
  const result = await repository.user.getUsers(userQuery);
  return result;
};

const getUserById = async (id) => {
  const result = await repository.user.getUserById(id);
  return result;
};

const updateUserName = async (updateUserId, updateData) => {
  const result = await repository.user.updateUserName(updateUserId, updateData);
  return result;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserName,
};
