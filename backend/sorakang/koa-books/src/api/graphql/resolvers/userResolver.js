const { userGraphController } = require('../controller');

const userResolver = {
  LoginResponse: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(obj) {
      if (obj.accessToken) {
        return 'LoginSuccess';
      }
      if (obj.message) {
        return 'message';
      }
      return null;
    },
  },

  Query: {
    currentUser: (parent, args, context) => context.user,

    /**
 * Get user list and cursor based pagination
 * @param { { first = 5, after }} param
 * @returns
 */
    getAllUser: async (parent, { first = 5, after }, context) => {
      const data = await userGraphController.getAllUser(parent, { first, after }, context);
      return data;
    },
  },

  Mutation: {
    signIn: async (parent, { input }, context) => {
      const data = await userGraphController.signIn(parent, { input }, context);
      return data;
    },

    signOut: async (parent, { input }, context) => {
      const data = await userGraphController.signOut(parent, { input }, context);
      return data;
    },

    createUser: async (parent, { input }, context) => {
      const data = await userGraphController.createUser(parent, { input }, context);
      return data;
    },

    updateUser: async (parent, { input }, context) => {
      const data = await userGraphController.updateUser(parent, { input }, context);
      return data;
    },

    deleteUser: async (parent, _, context) => {
      const data = await userGraphController.deleteUser(parent, context);
      return data;
    },

  },
};
module.exports = userResolver;
