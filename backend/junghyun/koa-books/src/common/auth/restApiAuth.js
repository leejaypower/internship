const JwtService = require('./jwtService');

// 인가 공통 로직
const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    throw new Error(401, 'Authorization header is missing');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(token);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const userAdminAuthorized = async (ctx, next) => {
  // const refreshToken = await
  const decodedToken = await authorize(ctx);
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next();
};

// 관리자 권한 부여
const adminAuthorized = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.role !== 'ADMIN') {
    throw new Error(401, 'You don\'t have permission to access.');
  }
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next();
};

module.exports = { userAdminAuthorized, adminAuthorized };
