const service = require('../service');
const lib = require('../lib');

const { errorHandler } = lib.util.error;

const createUser = async (ctx) => {
  try {
    if (!ctx.request.body.name
      || !ctx.request.body.email
      || !ctx.request.body.password) {
      errorHandler(1, 'User info\'s elements required.');
    }
    ctx.body = await service.user.createUser(ctx.request.body);
  } catch (err) {
    ctx.throw(err);
  }
};

const getUsers = async (ctx) => {
  try {
    ctx.body = await service.user.getUsers(ctx.request.body);
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserById = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await service.user.getUserById(id);
  } catch (err) {
    ctx.throw(err);
  }
};

const updateUserName = async (ctx) => {
  try {
    const { id } = ctx.params;
    const numOfUpdatedRow = await service.user.updateUserName(id, ctx.request.body);
    ctx.body = numOfUpdatedRow;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserByEmail = async (ctx) => {
  try {
    const { email } = ctx.request.body;
    const result = await service.user.getUserByEmail(email);
    ctx.body = result;
  } catch (err) {
    ctx.throw(err);
  }
};

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await service.user.signIn(email, password);
  ctx.body = token;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserName,
  signIn,
};
