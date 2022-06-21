const lib = require('../../../../lib');

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
      const decodedToken = await jwt.verify(token);
      if (decodedToken.role !== ROLE.USER) {
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
