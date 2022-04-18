const getUserData = require('../modules/getUserData');
const userList = require('../data/idnex').users;

module.exports = {
  get: (ctx) => {
    const { name } = ctx.params;
    // find uesr name from DB

    const userInfo = getUserData(name);
    ctx.status = 200;
    ctx.body = {
      message: 'succes',
      userInfo,
    };
  },

  post: (ctx) => {
    // db 와  연동하기
    const newId = userList.length;
    const newUser = { ...ctx.request.body, id: newId };
    ctx.status = 201;
    ctx.body = {
      message: 'succesfully created',
      newUser,
    };
  },

  patch: (ctx) => {
    // db 와  연동하기
    const { name } = ctx.params;
    // find user id
    const userInfo = userList.filter((user) => user.name === name)[0];
    const pathchedUser = { ...userInfo, ...ctx.request.body };
    ctx.status = 201;
    ctx.body = {
      message: 'succesfully patched',
      pathchedUser,
    };
  },

  delete: (ctx) => {
    const { name } = ctx.params;
    // delete user id from db
  },
};
