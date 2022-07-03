const service = require('../../../services');
const { customError } = require('../../../libs').errorHandler;
const validator = require('../../../libs/validator');

const getUser = async (ctx) => {
  const {
    limit = 20, cursor = 0, name = '', email = '', phone = '',
  } = ctx.request.query;

  const { data } = await service.user.getUser(Number(limit), cursor, name, email, phone);

  ctx.status = 200;
  ctx.body = { data };
};

const getSingleUser = async (ctx) => {
  const { userId } = ctx.params;
  if (!userId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  const { data } = await service.user.getSingleUser(userId);

  ctx.status = 200;
  ctx.body = { data };
};

const createUser = async (ctx) => {
  const { userInfo } = ctx.request.body;

  if (!userInfo) {
    throw new customError.ValidationError('유효하지 않는 body 입니다');
  }
  validator.emailValidator(userInfo.email);
  await service.user.createUser(userInfo);

  ctx.status = 201;
  ctx.body = { message: 'Successfully created' };
};

const updateUser = async (ctx) => {
  const { userInfo } = ctx.request.body;
  const { userId } = ctx.params;
  if (!userInfo || !userId) {
    throw new customError.ValidationError('유효하지 않는 body or id 입니다');
  }
  await service.user.updateUser(userId, userInfo);

  ctx.status = 201;
  ctx.body = { message: 'Successfully patched' };
};

const deleteUser = async (ctx) => {
  const { userId } = ctx.params;

  if (!userId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  await service.user.deleteUser(userId);

  ctx.status = 201;
  ctx.body = { message: 'Successfully deleted' };
};

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    throw new customError.ValidationError('유효하지 않는 email, password 입니다');
  }
  const { accessToken, refreshToken } = await service.user.signIn(email, password);

  ctx.status = 200;
  ctx.body = { accessToken, refreshToken, message: 'Login success' };
};

const signOut = async (ctx) => {
  const userId = ctx.user.id;

  if (!userId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  await service.user.signOut(userId);

  ctx.status = 201;
  ctx.body = { message: 'Logout success' };
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
