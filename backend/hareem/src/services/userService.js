// Service 역할
// 비지니스 로직

const { userRepository } = require('../repositories');

const getUsers = async (getUsersQuery) => {
  const users = await userRepository.getUsers(getUsersQuery);
  return users;
};
const getUser = async (id) => {
  const user = await userRepository.getUser(id);
  return user;
};
const createUser = async (createUserData) => {
  const createdUser = await userRepository.createUser(createUserData);
  return createdUser;
};
const updateUser = async (id, updateUserData) => {
  const updatedUser = await userRepository.updateUser(id, updateUserData);
  return updatedUser;
};
const deleteUser = async (id) => {
  const deletedUser = await userRepository.deleteUser(id);
  return deletedUser;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
