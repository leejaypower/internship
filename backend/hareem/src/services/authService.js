/* eslint-disable no-underscore-dangle */
const { authRepository } = require('../repositories');
const { userService, jwtService, hashService } = require('.');
const { CustomError } = require('../errors');
const { MESSAGE, COOKIE_NAME } = require('../utils/constants');

const _getToken = (tokenData) => {
  const {
    id,
    role,
    secretKey,
    expiresIn,
  } = tokenData;

  const token = jwtService.sign({
    payload: { id, role },
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

  const user = await userService.getUser({ email }, true);

  const compared = await hashService.compare(password, user.password);
  if (!compared) {
    throw new CustomError(400, '아이디 또는 비밀번호가 틀렸습니다');
  }

  const { token: accessToken } = _getToken({
    id: user.id,
    role: user.Auth.role,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

  const { token: refreshToken, expiresIn } = _getToken({
    id: user.id,
    role: user.Auth.role,
    secretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  await authRepository.saveRefreshToken(user.id, refreshToken);

  const refreshTokenCookie = _changeTokenToCookie({
    token: refreshToken,
    expiresIn,
    cookieName: COOKIE_NAME.REFRESH_TOKEN,
  });

  return {
    accessToken,
    refreshTokenCookie,
  };
};

const logout = async (userId) => {
  const [result] = await authRepository.saveRefreshToken(userId, null);

  const message = result === 0 ? '로그아웃 실패' : '로그아웃 성공';

  return message;
};

const refreshAccessToken = async (refreshToken) => {
  const { id } = jwtService.verify({
    token: refreshToken,
    secretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  });

  const auth = await authRepository.getAuth({
    userId: id,
  });

  if (refreshToken !== auth.refreshToken) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }

  const { token: accessToken } = _getToken({
    id,
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
