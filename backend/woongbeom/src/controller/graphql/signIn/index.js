const service = require('../../../service');

const signIn = async (email, password) => {
  const token = await service.admin.signIn(email, password);
  return token;
};

module.exports = { signIn };
