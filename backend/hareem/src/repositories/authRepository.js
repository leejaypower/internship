const { Auth } = require('../database/models');

const saveRefreshToken = async (userId, refreshToken) => {
  try {
    const result = await Auth.update({
      refreshToken,
    }, {
      where: { userId },
    });
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const getAuth = async (getBy) => {
  try {
    const auth = await Auth.findOne({
      where: getBy,
    });
    return auth;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  saveRefreshToken,
  getAuth,
};
