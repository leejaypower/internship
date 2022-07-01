const service = require('../../../services');

const getAccessToken = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get('refresh_token');

    if (!refreshToken) {
      throw new Error('invalid refresh token, please log in again');
    }
    const { accessToken } = await service.auth.getAccessToken(refreshToken);

    ctx.body = { accessToken, message: 'accessToken issued' };
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getAccessToken,
};
