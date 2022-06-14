const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-koa');

const userAuth = async (context) => {
  const { accessToken } = context.token;
  if (!accessToken) {
    throw new AuthenticationError('인증이 필요한 요청입니다.');
  }

  const tokenMessage = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        throw new AuthenticationError('해당 액세스토큰이 유효하지 않습니다.');
      }
      return decode;
    },
  );

  const { id, role } = tokenMessage;

  if (!role.includes('user')) {
    throw new ForbiddenError('인가되지 않은 요청입니다.');
  }

  return id;
};

const adminAuth = async (context) => {
  const { accessToken } = context.token;
  if (!accessToken) {
    throw new AuthenticationError('인증이 필요한 요청입니다.');
  }

  const tokenMessage = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        throw new AuthenticationError('해당 액세스토큰이 유효하지 않습니다.');
      }
      return decode;
    },
  );

  const { id, role } = tokenMessage;

  if (!role.includes('admin')) {
    throw new ForbiddenError('인가되지 않은 요청입니다.');
  }

  return id;
};

module.exports = {
  userAuth,
  adminAuth,
};
