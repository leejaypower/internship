const JwtService = require('./jwtService');

// 인가 공통 로직
const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    ctx.throw(401, 'Authorization header is missing');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(token);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const graphqlUserAdminAuthorized = () => (next) => async (root, args, { ctx }, info) => {
  const decodedToken = await authorize(ctx);
  if (!decodedToken) {
    throw new Error(401, 'You don\'t have permission to access.');
  }
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next(root, args, { ctx }, info);
};

// 관리자 권한 부여
const graphqlAdminAuthorized = () => (next) => async (root, args, { ctx }, info) => {
  const decodedToken = await authorize(ctx);
  if (!decodedToken || decodedToken?.role !== 'ADMIN') {
    throw new Error(401, 'You don\'t have permission to access.');
  }
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next(root, args, { ctx }, info);
};

module.exports = { graphqlUserAdminAuthorized, graphqlAdminAuthorized };
