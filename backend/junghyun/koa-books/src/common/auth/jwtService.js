const jwt = require('jsonwebtoken');
const { userRepository, adminUserRepository } = require('../../repository');

const {
  SECRET_KEY,
  REFRESH_SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = process.env;

// 액세스 토큰 생성
const issue = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_ACCESS_EXPIRES_IN });
};

// 리프레시 토큰 생성
const refresh = () => jwt.sign({}, SECRET_KEY, { expiresIn: JWT_REFRESH_EXPIRES_IN });

// 토큰 검사
const verify = (accessToken) => {
  try {
    const decodedToken = jwt.verify(accessToken, SECRET_KEY);
    return decodedToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error(419, 'The Token is expired');
    }
    if (err.name === 'JsonWebTokenError') {
      throw new Error(401, 'The Token is invalid');
    }
    throw new Error(`TokenError: ${err.message}`);
  }
};

const refreshVerify = async (refreshToken, userId) => {
  try {
    const user = await userRepository.getOne(userId)
    || await adminUserRepository.getOne(userId);
    if (user.refreshToken !== refreshToken) {
      return { ok: false };
    }
    const decodedToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    return decodedToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error(419, 'The Token is expired');
    }
    if (err.name === 'JsonWebTokenError') {
      throw new Error(401, 'The Token is invalid');
    }
    throw new Error(`TokenError: ${err.message}`);
  }
};

module.exports = {
  issue, refresh, verify, refreshVerify,
};
