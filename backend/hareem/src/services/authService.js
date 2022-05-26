/* eslint-disable no-underscore-dangle */
const { authRepository } = require('../repositories');
const { userService, jwtService, hashService } = require('.');
const { CustomError } = require('../errors');
const { MESSAGE, COOKIE_NAME } = require('../utils/constants');

const _getToken = (tokenData) => {
  const {
    userId,
    secretKey,
    expiresIn,
  } = tokenData;
  const token = jwtService.sign({
    payload: { id: userId },
    secretKey,
    options: { expiresIn: Number(expiresIn) },
  });

  return {
    expiresIn,
    token,
  };
};

const _changeTokenToCookie = (cookieData) => {
  const {
    token,
    expiresIn,
    cookieName,
  } = cookieData;

  const options = {
    httpOnly: true,
    maxAge: Number(expiresIn),
  };

  return {
    name: cookieName,
    token,
    options,
  };
};

const getAuth = async (userId) => {
  const auth = await authRepository.getAuth({
    userId,
  });
  return auth;
};

const login = async (loginData) => {
  const { email, password } = loginData;

  const getBy = { email };
  const user = await userService.getUser(getBy, true);
  const compared = await hashService.compare(password, user.password);
  if (!compared) {
    throw new CustomError(400, '아이디 또는 비밀번호가 틀렸습니다');
  }
  const { token: accessToken } = _getToken({
    userId: user.id,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  const { token: refreshToken, expiresIn } = _getToken({
    userId: user.id,
    secretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
  const refreshTokenCookie = _changeTokenToCookie({
    token: refreshToken,
    expiresIn,
    cookieName: COOKIE_NAME.REFRESH_TOKEN,
  });
  await authRepository.saveRefreshToken(user.id, refreshToken);
  return {
    accessToken,
    refreshTokenCookie,
  };
};

const logout = async (userId) => {
  const result = await authRepository.saveRefreshToken(userId, null);
  return result;
};

const refreshAccessToken = async (refreshToken) => {
  const { id, iat, exp } = jwtService.verify({
    token: refreshToken,
    secretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  });
  if (iat > exp) {
    throw CustomError(401, MESSAGE.AUTH_ERROR);
  }
  const auth = await authRepository.getAuth({
    userId: id,
  });
  if (refreshToken !== auth.refreshToken) {
    throw CustomError(401, MESSAGE.AUTH_ERROR);
  }
  const { token: accessToken } = _getToken({
    userId: id,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  return {
    accessToken,
  };
};

module.exports = {
  getAuth,
  login,
  logout,
  refreshAccessToken,
};
