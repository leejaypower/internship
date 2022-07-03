const bcrypt = require('bcrypt');
const { userRepository, loginInfoRepository } = require('../../repositories');
const { authUtils, errorHandler } = require('../../libs');

const getUser = async (limit, cursor, name, email, phone) => {
  const { userList } = await userRepository.getUser(limit, cursor, name, email, phone);

  if (!userList.length) {
    throw new errorHandler.customError.NoContentError();
  }
  const nextCursor = userList[userList.length - 1].id + 1;
  return { data: { userList, nextCursor } };
};

const getSingleUser = async (userId) => {
  const { user } = await userRepository.getSingleUser(userId);
  if (!user) {
    throw new errorHandler.customError.NoContentError();
  }
  return { data: user };
};

const createUser = async (userInfo) => {
  const { isCreated } = await userRepository.createUser(userInfo);

  if (!isCreated) {
    throw new errorHandler.customError.DataAlreadyExistsError('존재하는 아이디 입니다');
  }
  return { isCreated };
};

const updateUser = async (userId, usrInfo) => {
  if (usrInfo.email) {
    // email 중복 check
    const { user } = await userRepository.findByEmail(usrInfo.email);
    if (user) {
      throw new errorHandler.customError.DataAlreadyExistsError('이미 존재하는 이메일 입니다');
    }
  }
  const { isUpdated } = await userRepository.updateUser(userId, usrInfo);
  if (!isUpdated) {
    throw new errorHandler.customError.NoContentError('사용자가 없습니다');
  }

  return { isUpdated };
};

const deleteUser = async (userId) => {
  const { isDeleted } = await userRepository.deleteUser(userId);
  if (!isDeleted) {
    throw new errorHandler.customError.NoContentError('사용자가 없습니다');
  }
  return { isDeleted };
};

const signIn = async (email, password) => {
  const { user } = await userRepository.findByEmail(email);
  if (!user) {
    throw new errorHandler.customError.NoContentError();
  }
  const pw = user.dataValues.password;
  const userId = user.dataValues.id;
  const { groupName } = user.dataValues;
  const pwVerify = bcrypt.compareSync(password, pw);

  if (!pwVerify) {
    throw new errorHandler.customError.ValidationError('비밀번호가 유효하지 않습니다');
  }

  const { isLogin } = await loginInfoRepository.getIsLogin(userId);
  if (isLogin) {
    throw new errorHandler.customError.DataAlreadyExistsError('이미 로그인 중입니다');
  }
  // GET TOKEN
  const accessTokenExp = Number(process.env.ACCESS_EXP_DATE);
  const refreshTokenExp = Number(process.env.REFRESH_EXP_DATE);

  const iat = new Date().getTime();
  const accessToken = authUtils.getToken({ userId, groupName }, process.env.ACCESS_SECRET_KEY, accessTokenExp);
  const refreshToken = authUtils.getToken({ userId, groupName, iat }, process.env.REFRESH_SECRET_KEY, refreshTokenExp);

  const { isCreated } = await loginInfoRepository.createIsLogin(userId, iat);
  if (!isCreated) {
    throw new errorHandler.customError.DataAlreadyExistsError('로그인에 실패하였습니다.');
  }

  return { accessToken, refreshToken };
};

const signOut = async (userId) => {
  const { user } = await userRepository.getSingleUser(userId);
  if (!user) {
    throw new errorHandler.customError.NoContentError();
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
