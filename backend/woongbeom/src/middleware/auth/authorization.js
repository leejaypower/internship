const lib = require('../../lib');

const { errorHandler } = lib.util.error;
const { role } = lib.common.constant;
const { jwt } = lib.auth;

const decodeToken = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    errorHandler(1, 'Auth header does not exist.');
  }
  const token = ctx.req.headers.authorization;

  const decodedToken = await jwt.verify(token);

  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await decodeToken(ctx);
  if (decodedToken.role !== role.user) {
    errorHandler(1, 'This token is not authorized user\'s.');
  }
  ctx.decodedToken = decodedToken;

  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await decodeToken(ctx);
  if (decodedToken.role !== role.admin) {
    errorHandler(1, 'This token is not authorized admin\'s.');
  }
  ctx.decodedToken = decodedToken;

  return next();
};

module.exports = { authorizeUser, authorizeAdmin };
