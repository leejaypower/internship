const bcrypt = require('bcrypt');

const SALT = 10;

const hash = async (ctx, next) => {
  const { password } = ctx.request.body.userInfo;
  if (!password) return next();

  const bcryptPw = await bcrypt.hash(password, SALT);
  ctx.request.body.userInfo.password = bcryptPw;
  return next();
};

module.exports = { hash };
