const { sign } = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const { userRepository } = require('../../repositories');
const { customError, constant } = require('../error');

const { API_ERROR_CONSTANT } = constant;

/**
 * Check if token is valid
 * @param {String} accessToken
 * @returns  { state: true or false, data: user or {} }
 */

const isValidToken = async (accessToken) => {
  const decodeToken = verify(accessToken, process.env.ACCESS_SECRET_KEY);

  const { user } = await userRepository.getSingleUser(decodeToken?.userId);
  if (!user) {
    return { state: false, data: {} };
  }
  return { state: true, data: user };
};

const verifyTokenWrapper = async (token, key) => {
  try {
    const decodeToken = await verify(token, key);
    return decodeToken;
  } catch (err) {
    if (err.name === API_ERROR_CONSTANT.TOKEN_EXPIRED_ERROR) {
      throw new customError.UnauthenticatedError('Token이 만료되었습니다');
    }
  }
};

const getToken = (payload, secretKey, exp) => {
  const token = sign(
    payload,
    secretKey,
    { expiresIn: exp },
  );
  return token;
};

module.exports = { getToken, isValidToken, verifyTokenWrapper };
