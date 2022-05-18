// Controller 역할
// status code 및 res return

const { userService } = require('../services');

const getUsers = async (ctx) => {
  ctx.body = await userService.getUsers(ctx.request.query);
};
const getUser = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await userService.getUser(id);
};
const createUser = async (ctx) => {
  const user = await userService.createUser(ctx.request.body);
  ctx.body = user;
};
const updateUser = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await userService.updateUser(id, ctx.request.body);
};
const deleteUser = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await userService.deleteUser(id);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
