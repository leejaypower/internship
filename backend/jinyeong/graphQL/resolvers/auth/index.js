const jwt = require('jsonwebtoken');
const { util, constants } = require('../../../common');

const { ERROR_CODE, AUTH_ROLE } = constants;
const { CustomError } = util.errorHandler;

const userAuth = async (context) => {
  const { accessToken } = context.token;
  if (!accessToken) {
    throw new CustomError(ERROR_CODE.NEED_AUTHENTICATE);
  }

  const tokenMessage = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        throw new CustomError(ERROR_CODE.INVALID_TOKEN);
      }
      return decode;
    },
  );

  const { id, role } = tokenMessage;

  if (!role.includes(AUTH_ROLE.USER)) {
    throw new CustomError(ERROR_CODE.THIS_ROLE_NOT_AUTHORIZED);
  }

  return id;
};

const adminAuth = async (context) => {
  const { accessToken } = context.token;
  if (!accessToken) {
    throw new CustomError(ERROR_CODE.NEED_AUTHENTICATE);
  }

  const tokenMessage = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        throw new CustomError(ERROR_CODE.INVALID_TOKEN);
      }
      return decode;
    },
  );

  const { id, role } = tokenMessage;

  if (!role.includes(AUTH_ROLE.ADMIN)) {
    throw new CustomError(ERROR_CODE.THIS_ROLE_NOT_AUTHORIZED);
  }

  return id;
};

module.exports = {
  userAuth,
  adminAuth,
};
