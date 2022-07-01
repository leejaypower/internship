const bcrypt = require('bcrypt');
const { userRepository, loginInfoRepository } = require('../../repositories');
const { authUtils } = require('../../libs');

const getUser = async (limit, cursor, name, email, phone) => {
  const { userList } = await userRepository.getUser(limit, cursor, name, email, phone);
  const nextCursor = userList[userList.length - 1].id + 1;
  return { data: { userList, nextCursor } };
};

const getSingleUser = async (userId) => {
  const { user } = await userRepository.getSingleUser(userId);
  return { data: user };
};

const createUser = async (userInfo) => {
  const { isCreated } = await userRepository.createUser(userInfo);

  if (!isCreated) {
    throw new Error(409, 'User email already exist');
  }
  return { isCreated };
};

const updateUser = async (userId, usrInfo) => {
  if (usrInfo.email) {
    // email 중복 check
    const { user } = await userRepository.findByEmail(usrInfo.email);
    if (user) {
      throw new Error('Email already exist');
    }
  }
  const { isUpdated } = await userRepository.updateUser(userId, usrInfo);
  return { isUpdated };
};

const deleteUser = async (userId) => {
  const { isDeleted } = await userRepository.deleteUser(userId);
  if (!isDeleted) {
    throw new Error('Failed to cancel membership');
  }
  return { isDeleted };
};

const signIn = async (email, password) => {
  const { user } = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('User does not exist');
  }

  const pw = user.dataValues.password;
  const userId = user.dataValues.id;
  const { groupName } = user.dataValues;
  const pwVerify = bcrypt.compareSync(password, pw);
  if (!pwVerify) {
    throw new Error('Wrong user password');
  }

  const { isLogin } = await loginInfoRepository.getIsLogin(userId);
  if (isLogin) {
    throw new Error('already logged in');
  }
  // GET TOKEN
  const accessTokenExp = Number(process.env.ACCESS_EXP_DATE);
  const refreshTokenExp = Number(process.env.REFRESH_EXP_DATE);

  const iat = new Date().getTime();
  const accessToken = authUtils.getToken({ userId, groupName }, process.env.ACCESS_SECRET_KEY, accessTokenExp);
  const refreshToken = authUtils.getToken({ userId, groupName, iat }, process.env.REFRESH_SECRET_KEY, refreshTokenExp);

  await loginInfoRepository.createIsLogin(userId, iat);

  return { accessToken, refreshToken };
};

const signOut = async (userId) => {
  const { user } = await userRepository.getSingleUser(userId);
  if (!user) {
    throw new Error('user not found');
  }

  await loginInfoRepository.deleteIsLogin(userId);
  return { user };
};

module.exports = {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  signIn,
  signOut,
};