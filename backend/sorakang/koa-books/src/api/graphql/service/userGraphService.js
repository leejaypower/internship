const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server-koa');
const { getToken } = require('../../../utils/auth');
const { userRepository } = require('../../../repositories');
const { commonUtils } = require('../../../utils');

const { Sequelize } = require('../../../database/models');

const { Op } = Sequelize;

const getAllUser = async ({ first, after }) => {
  // 전체적으로 아래와 같이 쿼리 option을 service에서 구축 예정입니다.
  const whereOptions = {};

  if (after) {
    whereOptions.createdAt = { [Op.gt]: commonUtils.decodeCursor(after) };
  }

  const order = [['createdAt', 'ASC']];
  const { rows, count } = await userRepository.user.findAndCountAll(first, whereOptions, order);
  return { rows, count };
};

const signIn = async ({ input }) => {
  const { user } = await userRepository.user.findByEmail(input.email);
  if (!user) {
    throw new UserInputError('User does not exist');
  }

  const { id: userId, password, groupName } = user.dataValues;

  const isValidPassword = bcrypt.compareSync(input.password, password);
  if (!isValidPassword) {
    throw new UserInputError('Wrong user password');
  }

  const { isLogin } = await userRepository.loginInfo.getIsLogin(userId);

  if (isLogin) {
    return { message: 'already logged in' };
  }
  // GET TOKEN

  const accessTokenExp = Number(process.env.ACCESS_EXP_DATE);
  const refreshTokenExp = Number(process.env.REFRESH_EXP_DATE);

  const role = groupName.toUpperCase();
  const issuedAt = new Date().getTime();

  const accessToken = getToken({ userId, role }, process.env.ACCESS_SECRET_KEY, accessTokenExp);
  const refreshToken = getToken({ userId, role, issuedAt }, process.env.REFRESH_SECRET_KEY, refreshTokenExp);

  await userRepository.loginInfo.createIsLogin(userId, issuedAt);

  return { accessToken, refreshToken };
};

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
      throw new UserInputError('Email already exist');
    }
  }

  const { isUpdated } = await userRepository.user.updateUser(userId, input);
  // update가 안되었을 경우 error처리하기
  return { isUpdated };
};

module.exports = {
  signIn, updateUser, getAllUser, signOut,
};
