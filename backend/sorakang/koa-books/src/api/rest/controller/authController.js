const service = require('../../../services');
const { errorHandler } = require('../../../libs');

const { UnauthenticatedError } = errorHandler.customError;

const getAccessToken = async (ctx, next) => {
  const refreshToken = ctx.cookies.get('refresh_token');

  if (!refreshToken) {
    throw new UnauthenticatedError('다시 로그인 해주세요');
  }
  const { accessToken } = await service.auth.getAccessToken(refreshToken);

  ctx.body = { accessToken, message: 'accessToken issued' };
};

module.exports = {
  getAccessToken,
};
