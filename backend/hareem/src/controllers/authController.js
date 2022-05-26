const { authService } = require('../services');
const { COOKIE_NAME } = require('../utils/constants');

// Controller 역할
// status code 및 res return

const login = async (ctx) => {
  try {
    const {
      accessToken,
      refreshTokenCookie: cookie,
    } = await authService.login(ctx.request.body);
    ctx.cookies.set(cookie.name, cookie.token, cookie.options);
    ctx.body = {
      accessToken,
    };
  } catch (error) {
    ctx.throw(error);
  }
};

const logout = async (ctx) => {
  try {
    const { id: userId } = ctx.user;
    await authService.logout(userId);
    ctx.body = '로그아웃 완료';
  } catch (error) {
    ctx.throw(error);
  }
};

const refreshAccessToken = async (ctx) => {
  try {
    const {
      accessToken,
    } = await authService.refreshAccessToken(ctx.cookies.get(COOKIE_NAME.REFRESH_TOKEN));
    ctx.body = {
      accessToken,
    };
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  login,
  logout,
  refreshAccessToken,
};
