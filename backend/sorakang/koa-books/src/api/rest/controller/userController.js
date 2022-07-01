const service = require('../../../services');

const getUser = async (ctx) => {
  // input validation -> error handling 주차에 같이 진행
  try {
    const {
      limit = 20, cursor = 0, name = '', email = '', phone = '',
    } = ctx.request.query;

    const { data } = await service.user.getUser(Number(limit), cursor, name, email, phone);

    ctx.status = 200;
    ctx.body = { data };
  } catch (err) {
    ctx.throw(err);
  }
};

const getSingleUser = async (ctx) => {
  try {
    const { userId } = ctx.params;

    const { data } = await service.user.getSingleUser(userId);

    ctx.body = { data };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const createUser = async (ctx) => {
  try {
    const { userInfo } = ctx.request.body;

    await service.user.createUser(userInfo);

    ctx.status = 201;
    ctx.body = { message: 'Successfully created' };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const updateUser = async (ctx) => {
  try {
    const { userInfo } = ctx.request.body;
    const { userId } = ctx.params;

    const { isUpdated } = await service.user.updateUser(userId, userInfo);
    if (!isUpdated) {
      ctx.throw(404, 'Not found : User does not exist');
    }

    ctx.status = 201;
    ctx.body = { message: 'Successfully patched' };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const deleteUser = async (ctx) => {
  try {
    const { userId } = ctx.params;
    const { isDeleted } = await service.user.deleteUser(userId);

    if (!isDeleted) {
      ctx.throw(404, 'Not found : User does not exist');
    }

    ctx.status = 201;
    ctx.body = { message: 'Successfully deleted' };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const signIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    const { accessToken, refreshToken } = await service.user.signIn(email, password);

    ctx.status = 200;

    ctx.body = { accessToken, refreshToken, message: 'Login success' };
  } catch (err) {
    throw Error(err);
  }
};

const signOut = async (ctx) => {
  try {
    const userId = ctx.user.id;

    const { user } = await service.user.signOut(userId);

    if (!user) {
      throw new Error('user not found');
    }
    ctx.status = 201;
    ctx.body = { message: 'Logout success' };
  } catch (err) {
    throw Error(err);
  }
};
module.exports = {
  getUser, getSingleUser, createUser, updateUser, deleteUser, signIn, signOut,
};
