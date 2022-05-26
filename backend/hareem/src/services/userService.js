const { CustomError } = require('../errors');
const { userRepository } = require('../repositories');

const createUser = async (createUserData) => {
  const {
    email,
  } = createUserData;

  const user = userRepository.getUserByEmail(email);
  if (!user) {
    throw new CustomError(400, '이미 사용중인 이메일입니다');
  }

  const newUser = userRepository.createUser(createUserData);
  return newUser;
};

const getUsers = async (getUsersQuery) => {
  const users = await userRepository.getUsers(getUsersQuery);
  return users;
};

const getUser = async (id) => {
  const user = await userRepository.getUser(id);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }
  return user;
};

const updateUser = async (id, updateUserData) => {
  await userRepository.updateUser(id, updateUserData);
  const user = await userRepository.getUser(id);
  if (!user) {
    throw new CustomError(404, '회원 정보를 찾을 수 없습니다');
  }
  return user;
};

const deleteUser = async (id) => {
  const result = await userRepository.deleteUser(id);
  if (!result) {
    throw new CustomError(400, '회원 탈퇴 실패');
  }
  return '회원 탈퇴 완료';
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
