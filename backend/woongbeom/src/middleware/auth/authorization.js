const lib = require('../../../lib');

const authorize = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    errorHandler(1, 'Auth header does not exist.');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = await lib.auth.jwt.verify(token);
  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.ROLE !== lib.common.constant.ROLE.USER) {
    lib.util.error.errorHandler(1, 'This token is not authorized user\'s.');
  }
  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.role !== ROLE.ADMIN) {
    errorHandler(1, 'This token is not authorized admin\'s.');
  }
  if (decodedToken.ROLE !== lib.common.constant.ROLE.ADMIN) {
    lib.util.error.errorHandler(1, 'This token is not authorized user\'s.');
  }
  return next();
};

module.exports = { authorize, authorizeUser, authorizeAdmin };
