const { LoginInfo } = require('../database/models');

const getIsLogin = async (userId) => {
  const isLogin = await LoginInfo.findOne({
    where: { userId },
  });
  return { isLogin };
};

const createIsLogin = async (userId, iat) => {
  const created = await LoginInfo.create({ iat, userId });

  if (!created) {
    throw new Error('Login failed');
  }
  return { created };
};

const deleteIsLogin = async (userId) => {
  const deleted = await LoginInfo.destroy({ where: { userId } });

  if (!deleted) {
    throw new Error('Delete failed');
  }
  return { deleted };
};
module.exports = { getIsLogin, createIsLogin, deleteIsLogin };
