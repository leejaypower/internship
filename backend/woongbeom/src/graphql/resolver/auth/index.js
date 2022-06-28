const lib = require('../../../../lib');

/**
 * ToDo
 * 문구 중복 방지 작업
 */
const { errorHandler } = lib.util.error;

const auth = {
  Query: {
    isAuthenticatedUser: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        errorHandler(1, 'Auth token does not exist.');
      }
      const decodedToken = await lib.auth.jwt.verify(token);

      if (decodedToken.role !== lib.common.constant.ROLE.USER) {
        errorHandler(1, 'This token has invalid role.');
      }
      return next(parent, args, decodedToken);
    },

    isAuthenticatedAdmin: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        errorHandler(1, 'Auth token does not exist.');
      }

      const decodedToken = await lib.auth.jwt.verify(token);

      if (decodedToken.role !== lib.common.constant.ROLE.ADMIN) {
        errorHandler(1, 'This token has invalid role.');
      }
      return next(parent, args, decodedToken);
    },
  },
  Mutation: {
    isAuthenticatedUser: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        errorHandler(1, 'Auth token does not exist.');
      }
      const decodedToken = await lib.auth.jwt.verify(token);

      if (decodedToken.role !== lib.common.constant.ROLE.USER) {
        errorHandler(1, 'This token has invalid role.');
      }
      return next(parent, args, decodedToken);
    },

    isAuthenticatedAdmin: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        errorHandler(1, 'Auth token does not exist.');
      }

      const decodedToken = await lib.auth.jwt.verify(token);

      if (decodedToken.role !== lib.common.constant.ROLE.ADMIN) {
        errorHandler(1, 'This token has invalid role.');
      }
      return next(parent, args, decodedToken);
    },
  },
};

module.exports = auth;

/**
 * ToDo
 * Query, Mutation depth에서 작업하니 중복코드가 발생
 * depth를 끌어올려 미들웨어로 부착할 수 있도록 작업
 */
