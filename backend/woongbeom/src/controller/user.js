const service = require('../service');

const createUser = async (ctx) => {
  ctx.body = await service.user.createUser(ctx.request.body);
};

const getListAll = async (ctx) => {
  ctx.body = await service.user.getListAll();
};

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await service.user.signIn(email, password);
  ctx.body = token;
};

module.exports = { createUser, getListAll, signIn };
