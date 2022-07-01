const { verify } = require('jsonwebtoken');
const { userRepository } = require('../../repositories');

/**
 * Check if token is valid
 * @param {String} accessToken
 * @returns  { state: true or false, data: user or {} }
 */

const isValidToken = async (accessToken) => {
  const decodeToken = verify(accessToken, process.env.ACCESS_SECRET_KEY);

  const { user } = await userRepository.user.getSingleUser(decodeToken?.userId);

  if (!user) {
    return { state: false, data: {} };
  }
  return { state: true, data: user };
};

module.exports = { isValidToken };
