const lib = require('../../../../lib');

/**
 * auth resolver
 * query, mutation 말고 depth 자체를 빼두면 로직이 겹치지 않게 설계할 수 있을 듯 하다.
 */
const auth = {
  Query: {
    isAuthenticatedUser: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        return context.throw('error');
      }
      const decodedToken = await lib.auth.jwt.verify(token);
      if (decodedToken.ROLE !== lib.common.constant.ROLE.ADMIN) {
        return context.throw('error');
      }
      return next();
    },

    isAuthenticatedAdmin: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        return context.throw('error');
      }
      const decodedToken = await jwt.verify(token);
      if (decodedToken.role !== ROLE.ADMIN) {
        return context.throw('error');
      }
      return next();
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
        errorHandler(1, 'This token has invalid role.')
      }
      return next(parent, args, decodedToken);
    },

    isAuthenticatedAdmin: () => (next) => async (parent, args, context) => {
      const token = context.request.header.authorization;
      if (!token) {
        return context.throw('error');
      }
      const decodedToken = await jwt.verify(token);
      if (decodedToken.role !== ROLE.ADMIN) {
        return context.throw('error');
      }
      return next();
    },
  },
};

module.exports = auth;
