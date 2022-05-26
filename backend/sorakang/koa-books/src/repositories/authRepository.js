const { LoginInfo } = require('../database/models');

const verifyAuth = async (userId) => {
  const iat = await LoginInfo.findOne({
    where: { userId },
    attributes: ['iat'],
  }).then((result) => result.dataValues);

  if (!iat) {
    throw new Error('invalid refresh token, please log in again');
  }
  return { iat };
};

module.exports = {
  verifyAuth,
};
