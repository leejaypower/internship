const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { COOKIE, TABLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { authService } = require('../../../services');

const authResolver = {
  Mutation: {
    login: async (_, { input }, { ctx }) => {
      const {
        accessToken,
        refreshTokenCookie: cookie,
      } = await authService.login(input);

      ctx.cookies.set(cookie.name, cookie.token, cookie.options);
      return { success: true, accessToken };
    },

    logout: async (_, { input }, { ctx }) => {
      const { user } = ctx;

      const result = await authService.logout(user.id);

      return { success: true, result };
    },

    refreshAccessToken: async (_, { input }, { ctx }) => {
      const refreshToken = ctx.cookies.get(COOKIE.REFRESH_TOKEN);

      const { accessToken } = await authService.refreshAccessToken(refreshToken);

      return { success: true, accessToken };
    },
  },
};

const resolversComposition = {
  'Mutation.logout': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
};

const composedAuthResolver = composeResolvers(authResolver, resolversComposition);

module.exports = composedAuthResolver;
