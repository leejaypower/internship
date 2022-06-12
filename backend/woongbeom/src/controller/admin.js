const service = require('../service');

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await service.admin.signIn(email, password);
  ctx.header = token;
  ctx.body = token;
};

module.exports = { signIn };
