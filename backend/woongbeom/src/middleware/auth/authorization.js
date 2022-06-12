const lib = require('../../../lib');

const authorize = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    return ctx.throw(401, 'Auth header does not exist');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = await lib.auth.jwt.verify(token);
  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.ROLE !== lib.common.constant.ROLE.USER) { ctx.throw(401, 'Unauthorized'); }
  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.ROLE !== lib.common.constant.ROLE.ADMIN) { ctx.throw(401, 'Unauthorized'); }
  return next();
};

module.exports = { authorize, authorizeUser, authorizeAdmin };
