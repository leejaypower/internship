const { Auth } = require('../../database/models');

const saveRefreshToken = async (userId, refreshToken) => {
  const result = await Auth.update({
    refreshToken,
  }, {
    where: { userId },
  });

  return result;
};

const getAuth = async (getBy) => {
  const auth = await Auth.findOne({
    where: getBy,
  });

  return auth;
};

const getAuthsByOptions = async (options) => {
  const auths = await Auth.findAll(options);

  return auths;
};

module.exports = {
  saveRefreshToken,
  getAuth,
  getAuthsByOptions,
};
