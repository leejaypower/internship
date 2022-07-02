const { LoginInfo } = require('../database/models');

const verifyAuth = async (userId) => {
  const iat = await LoginInfo.findOne({
    where: { userId },
    attributes: ['iat'],
  }).then((result) => result.dataValues);
  return { iat };
};

module.exports = {
  verifyAuth,
};
