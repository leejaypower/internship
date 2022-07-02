const { verify } = require('jsonwebtoken');
const { authRepository } = require('../../repositories');
const { authUtils, errorHandler } = require('../../libs');

const { UnauthenticatedError } = errorHandler.customError;

const getAccessToken = async (rToken) => {
  // decode rToken
  const decode = verify(rToken, process.env.REFRESH_SECRET_KEY);

  if (!decode) {
    throw new UnauthenticatedError('다시 로그인 해주세요');
  }

  // check userId is valid
  const { iat } = await authRepository.verifyAuth(decode.userId);

  if (!iat || iat !== decode.iat) {
    throw new UnauthenticatedError('다시 로그인 해주세요');
  }

  const payload = { ...decode };
  const exp = process.env.ACCESS_EXP_DATE;
  const secret = process.env.ACCESS_SECRET_KEY;

  const aToken = authUtils.tokenFunc.getToken(payload, secret, exp);

  return { aToken, iat };
};

module.exports = {
  getAccessToken,
};
