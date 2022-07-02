const lib = require('../../../lib');

const { errorHandler } = lib.util.error;
const { jwt } = lib.auth;
const { constant } = lib.common;

const user = () => (next) => async (parent, args, context) => {
  const token = context.request.header.authorization;
  if (!token) {
    errorHandler(1, 'Auth token does not exist.');
  }
  const decodedToken = await jwt.verify(token);

  if (decodedToken.role !== constant.role.user) {
    errorHandler(1, 'This token has invalid role.');
  }

  return next(parent, args, decodedToken);
};

const admin = () => (next) => async (parent, args, context) => {
  const token = context.request.header.authorization;
  if (!token) {
    errorHandler(1, 'Auth token does not exist.');
  }
  const decodedToken = await jwt.verify(token);

  if (decodedToken.role !== constant.role.admin) {
    errorHandler(1, 'This token has invalid role.');
  }

  return next(parent, args, decodedToken);
};

module.exports = { user, admin };
