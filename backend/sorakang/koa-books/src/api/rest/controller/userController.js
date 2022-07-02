const service = require('../../../services');

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
  const { data } = await service.user.getSingleUser(userId);

  ctx.status = 200;
  ctx.body = { data };
};

const createUser = async (ctx) => {
  const { userInfo } = ctx.request.body;

  await service.user.createUser(userInfo);

  ctx.status = 201;
  ctx.body = { message: 'Successfully created' };
};

const updateUser = async (ctx) => {
  const { userInfo } = ctx.request.body;
  const { userId } = ctx.params;

  await service.user.updateUser(userId, userInfo);

  ctx.status = 201;
  ctx.body = { message: 'Successfully patched' };
};

const deleteUser = async (ctx) => {
  const { userId } = ctx.params;
  await service.user.deleteUser(userId);

  ctx.status = 201;
  ctx.body = { message: 'Successfully deleted' };
};

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;

  const { accessToken, refreshToken } = await service.user.signIn(email, password);

  ctx.status = 200;

  ctx.body = { accessToken, refreshToken, message: 'Login success' };
};

const signOut = async (ctx) => {
  const userId = ctx.user.id;

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
