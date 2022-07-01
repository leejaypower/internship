const { verify } = require('jsonwebtoken');
const { authRepository } = require('../../repositories');
const { authUtils } = require('../../libs');

const getAccessToken = async (rToken) => {
  // decode rToken
  const decode = verify(rToken, process.env.REFRESH_SECRET_KEY);

  if (!decode) {
    throw Error('invalid refresh token, please log in again');
  }

  // check userId is valid
  const { iat } = await authRepository.verifyAuth(decode.userId);

  if (iat !== decode.iat) {
    throw new Error('invalid refresh token, please log in again');
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
