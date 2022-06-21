const { userService } = require('../../services');

module.exports = {
  User: {
    auth: async ({ id: userId }, _, { loaders }) => {
      const auth = loaders.user.getAuth.load(userId);

      return auth;
    },
  },

  Query: {
    getUser: async (_, { input }) => {
      const { id: userId } = input;

      const user = await userService.getUserById(userId, true);

      return { success: true, user };
    },

    getUsers: async (_, { input }) => {
      const users = await userService.getUsers({ ...input, only: true });

      return { success: true, users };
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
