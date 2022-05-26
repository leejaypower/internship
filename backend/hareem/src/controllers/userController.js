// Controller 역할
// status code 및 res return
// joi validation?

const { userService } = require('../services');

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

const getUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.getUser(id);
  } catch (error) {
    ctx.throw(error);
  }
};

const updateUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.updateUser(id, ctx.request.body);
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
