const { hashService } = require('../index');
const { userRepository } = require('../../repositories');
const { CustomError } = require('../../errors');
const { HASH_SALT } = require('../../constants');

const createUser = async (createData) => {
  const {
    email,
    password,
  } = createData;

  const getBy = { email };
  const user = await userRepository.getUser(getBy);
  if (user?.email === email) {
    throw new CustomError(400, '이미 등록된 이메일입니다');
  }

  const hashedPassword = await hashService.hash(password, HASH_SALT);
  const newUser = await userRepository.createUser({
    ...createData,
    password: hashedPassword,
  });

  return newUser;
};

const getUsers = async (query) => {
  const users = await userRepository.getUsers(query);

  return users;
};

const getUser = async (getBy, selectPassword = false) => {
  const user = await userRepository.getUser(getBy, selectPassword);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }

  return user;
};

const getUserById = async (id, only = false) => {
  const user = await userRepository.getUserById(id, only);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }

  return user;
};

const updateUser = async (id, updateData) => {
  const {
    only = false,
  } = updateData;

  await userRepository.updateUser({ id }, updateData);

  const user = await userRepository.getUserById(id, only);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }

  return user;
};

const updateUserByAdmin = async (id, updateData) => {
  await userRepository.updateUserByAdmin(id, updateData);

  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }

  return user;
};

const deleteUser = async (id) => {
  const result = await userRepository.deleteUser({ id });
  if (!result) {
    throw new CustomError(400, '회원 탈퇴 실패');
  }

  return '회원 탈퇴 완료';
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserByAdmin,
  deleteUser,
};
