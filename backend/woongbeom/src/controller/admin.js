const service = require('../service');

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await service.admin.signIn(email, password);
  ctx.header = token;
};

module.exports = { signIn };
