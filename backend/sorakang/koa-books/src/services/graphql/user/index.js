const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server-koa');
const { userRepository, loginInfoRepository } = require('../../../repositories');
const { commonUtils, authUtils } = require('../../../libs');
const { Sequelize } = require('../../../database/models');
const { customError } = require('../../../libs').errorHandler;

const { Op } = Sequelize;

const getAllUser = async ({ first, after }) => {
  const whereOptions = {};
  if (after) {
    whereOptions.createdAt = { [Op.gt]: commonUtils.decodeCursor(after) };
  }

  const order = [['createdAt', 'ASC']];
  const { rows, count } = await userRepository.findAndCountAll(first, whereOptions, order);
  if (!rows?.length) {
    throw new customError.NoContentError('사용자가 존재하지 않습니다');
  }

  return { rows, count };
};

const signIn = async ({ input }) => {
  // User 유무 확인
  const { user } = await userRepository.findByEmail(input.email);
  if (!user) {
    throw new customError.NoContentError('사용자가 존재하지 않습니다');
  }
  const { id: userId, password, groupName } = user.dataValues;

  // 비밀번호 유효성확인
  const isValidPassword = bcrypt.compareSync(input.password, password);
  if (!isValidPassword) {
    throw new UserInputError('Wrong user password');
  }

  // 로그인 중복 확인
  const { isLogin } = await loginInfoRepository.getIsLogin(userId);

  if (isLogin) {
    throw new customError.DataAlreadyExistsError('이미 로그인 되어있습니다');
  }

  // GET TOKEN
  const accessTokenExp = Number(process.env.ACCESS_EXP_DATE);
  const refreshTokenExp = Number(process.env.REFRESH_EXP_DATE);

  const role = groupName.toUpperCase();
  const issuedAt = new Date().getTime();

  const accessToken = authUtils.getToken({ userId, role }, process.env.ACCESS_SECRET_KEY, accessTokenExp);
  const refreshToken = authUtils.getToken({ userId, role, issuedAt }, process.env.REFRESH_SECRET_KEY, refreshTokenExp);

  await loginInfoRepository.createIsLogin(userId, issuedAt);

  return { accessToken, refreshToken };
};

// rest api와 병합하기 (다음 pr)
const signOut = async (parent, { input }, context) => {
  try {
    const { userId } = input;
    const data = await userService.signOut(userId);

    return { message: 'log out successfully' };
  } catch (err) {
    throw Error(err);
  }
};

const updateUser = async ({ input, userId }) => {
  if (input?.email) {
    // email 있다면 중복 check
    const { user } = await userRepository.user.findByEmail(input.email);

    if (user) {
      throw new customError.DataAlreadyExistsError('존재하는 email 입니다');
    }
  }

  const { isUpdated } = await userRepository.user.updateUser(userId, input);

  if (!isUpdated) {
    throw new customError.NoContentError('사용자가 존재하지 않습니다');
  }

  return { isUpdated };
};

module.exports = {
  signIn, updateUser, getAllUser, signOut,
};
