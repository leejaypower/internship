const lib = require('../../lib');

const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;
const { role } = lib.common.constant;
const { jwt } = lib.auth;

const decodeToken = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    throw new CustomError(errorCode.requiredToken, '[src/middleware/auth/authorization.js]');
  }
  const token = ctx.req.headers.authorization;

  const decodedToken = await jwt.verify(token);

  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await decodeToken(ctx);
  if (decodedToken.role !== role.user) {
    throw new CustomError(errorCode.invalidToken, '[src/middleware/auth/authorization.js]');
  }
  ctx.decodedToken = decodedToken;

  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await decodeToken(ctx);
  if (decodedToken.role !== role.admin) {
    throw new CustomError(errorCode.invalidToken, '[src/middleware/auth/authorization.js]');
  }
  ctx.decodedToken = decodedToken;

  return next();
};

module.exports = { authorizeUser, authorizeAdmin };
