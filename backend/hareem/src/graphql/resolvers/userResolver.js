const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { TABLE } = require('../../constants');
const { authMiddleware } = require('../../middlewares');
const { userService } = require('../../services');

const userResolver = {
  User: {
    auth: async ({ id: userId }, _, { loaders }) => {
      const auth = loaders.user.getAuth.load(userId);

      return auth;
    },
  },

  Query: {
    getUsers: async (_, { input }) => {
      const users = await userService.getUsers({ ...input, only: true });

      return { success: true, users };
    },

    getUser: async (_, { input }) => {
      const { id: userId } = input;

      const user = await userService.getUserById(userId, true);

      return { success: true, user };
    },

    getUserSelf: async (_, { input }, { ctx }) => {
      const { user: self } = ctx;

      const user = await userService.getUserById(self.id, true);

      return { success: true, user };
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = await userService.createUser({ ...input, only: true });

      return { success: true, user };
    },

    updateUser: async (_, { input }) => {
      const { id: userId } = input;

      const user = await userService.updateUser(userId, { ...input, only: true });

      return { success: true, user };
    },

    deleteUser: async (_, { input }) => {
      const { id: userId } = input;

      const result = await userService.deleteUser(userId);

      return { success: true, result };
    },
  },
};

const resolversComposition = {
  'Query.getUserSelf': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
  'Query.getUser': [authMiddleware([TABLE.USER_ROLE.ADMIN], true)],
  'Query.getUsers': [authMiddleware([TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.updateUser': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.deleteUser': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
};

const composedUserResolver = composeResolvers(userResolver, resolversComposition);

module.exports = composedUserResolver;
