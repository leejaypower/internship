const lib = require('../../../lib');

const authorize = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    lib.util.error.errorHandler(1, 'Auth header does not exist.');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = await lib.auth.jwt.verify(token);
  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.role !== lib.common.constant.ROLE.USER) {
    lib.util.error.errorHandler(1, 'This token is not authorized user\'s.');
  }
  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.role !== lib.common.constant.ROLE.ADMIN) {
    lib.util.error.errorHandler(1, 'This token is not authorized admin\'s.');
  }

  return next();
};

module.exports = { authorize, authorizeUser, authorizeAdmin };

/**
 * auth 미들웨어를 현재 라우터 단에서 사용하고 있습니다.
 * jwt.verfy (decode 메서드) 자체를 미들웨어에서 처리해서 컨트롤러로 넘겨주는 것이 좋을 것 같아, 작업을 고려하고 있습니다.
 */
