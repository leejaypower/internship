const service = require('../service');

const signIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const token = await service.admin.signIn(email, password);
    ctx.body = token;
  } catch (err) {
    throw err.message;
  }
};

module.exports = { signIn };
