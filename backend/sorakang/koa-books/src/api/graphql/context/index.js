const { ApolloError } = require('apollo-server-koa');
const { isValidToken } = require('../../../utils/auth');

/**
 * Check authentication and return user role
 * @param {*} ctx
 * @returns
 */
module.exports = async ({ ctx }) => {
  try {
    const accessToken = ctx.request.headers.authorization;

    if (!accessToken) {
      return { code: 'ANONYMOUS' };
    }

    const decodeToken = await isValidToken(accessToken);
    const code = decodeToken.data.dataValues.groupName.toUpperCase();

    if (!decodeToken.state) {
      throw new ApolloError('Invalid Token', '401');
    }

    const currentUser = decodeToken.data.dataValues;

    return { code, user: currentUser };
  } catch (err) {
    throw Error(err);
  }
};
