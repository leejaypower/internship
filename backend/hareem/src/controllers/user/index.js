const { userService } = require('../../services');

const createUser = async (ctx) => {
  try {
    const user = await userService.createUser(ctx.request.body);
    ctx.body = user;
  } catch (error) {
    ctx.throw(error);
  }
};

const getUsers = async (ctx) => {
  try {
    ctx.body = await userService.getUsers(ctx.request.query);
  } catch (error) {
    ctx.throw(error);
  }
};

const getUserById = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.getUserById(id);
  } catch (error) {
    ctx.throw(error);
  }
};

const updateUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.updateUserByAdmin(id, ctx.request.body);
  } catch (error) {
    ctx.throw(error);
  }
};

const deleteUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.deleteUser(id);
  } catch (error) {
    ctx.throw(error);
  }
};

const getUserSelf = async (ctx) => {
  try {
    const { id } = ctx.user;
    ctx.body = await userService.getUserById(id);
  } catch (error) {
    ctx.throw(error);
  }
};

const updateUserSelf = async (ctx) => {
  try {
    const { id } = ctx.user;
    ctx.body = await userService.updateUser(id, ctx.request.body);
  } catch (error) {
    ctx.throw(error);
  }
};

const deleteUserSelf = async (ctx) => {
  try {
    const { id } = ctx.user;
    ctx.body = await userService.deleteUser(id);
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserSelf,
  updateUserSelf,
  deleteUserSelf,
};
