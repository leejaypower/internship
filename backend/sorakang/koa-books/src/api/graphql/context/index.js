const { authUtils } = require('../../../libs');
const { customError, constant } = require('../../../libs').errorHandler;

const { ERROR_STATE } = constant;
const { UNAUTHENTICATED } = ERROR_STATE;

/**
 * Check authentication and return user role
 * @param {*} ctx
 * @returns
 */
module.exports = async ({ ctx }) => {
  const accessToken = ctx.request.headers.authorization;

  if (!accessToken) {
    return { code: 'ANONYMOUS' };
  }
  const decodeToken = await authUtils.isValidToken(accessToken);
  const code = decodeToken.data.dataValues.groupName.toUpperCase();

  if (!decodeToken.state) {
    throw new customError.GraphqlCustomError(UNAUTHENTICATED.name, UNAUTHENTICATED.message);
  }
  const currentUser = decodeToken.data.dataValues;

  return { code, user: currentUser };
};
