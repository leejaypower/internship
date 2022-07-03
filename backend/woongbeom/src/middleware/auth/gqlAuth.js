const lib = require('../../lib');

const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

const { jwt } = lib.auth;
const { constant } = lib.common;

const user = () => (next) => async (parent, args, context) => {
  const token = context.request.header.authorization;
  if (!token) {
    throw new CustomError(errorCode.requiredToken, '[src/graphql/resolver/auth/index.js]');
  }
  const decodedToken = await jwt.verify(token);

  if (decodedToken.role !== constant.role.user) {
    throw new CustomError(errorCode.invalidRole, '[src/graphql/resolver/auth/index.js]');
  }

  return next(parent, args, decodedToken);
};

const admin = () => (next) => async (parent, args, context) => {
  const token = context.request.header.authorization;
  if (!token) {
    throw new CustomError(errorCode.requiredToken, '[src/graphql/resolver/auth/index.js]');
  }
  const decodedToken = await jwt.verify(token);

  if (decodedToken.role !== constant.role.admin) {
    throw new CustomError(errorCode.invalidRole, '[src/graphql/resolver/auth/index.js]');
  }

  return next(parent, args, decodedToken);
};

module.exports = { user, admin };
