const lib = require('../../../../lib');

const auth = {
  Query: {
    isAuthenticated: () => (next) => async (parent, args, context, info) => {
      const token = context.request.header.authorization;
      if (!token) {
        return context.throw('error');
      }
      const decodedToken = await lib.auth.jwt.verify(token);
      if (decodedToken.ROLE !== lib.common.constant.ROLE.ADMIN) {
        return context.throw('error');
      }
      return next(parent, args, context, info);
    },
  },
  Mutation: {},
};

module.exports = auth;
