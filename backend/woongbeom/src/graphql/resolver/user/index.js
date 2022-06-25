const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const user = {
  Query: {
    getUsers: async (_, userQuery) => {
      const result = await controller.user.getUsers(userQuery);
      return result;
    },
    getUserById: async (_, userId) => {
      const userNumber = userId.id;
      const result = await controller.user.getUserById(userNumber);
      return [result];
    },
  },
  Mutation: {
    createUser: async (_, userData) => {
      const result = await controller.user.createUser(userData);
      return [result];
    },
    updateUserName: async (_, userName) => {
      const updateUserId = userName.id;
      const result = await controller.user.updateUserName(updateUserId, userName);
      return result;
    },
    signIn: async (_, args) => {
      const { email, password } = args;
      const token = await controller.user.signIn(email, password);
      return { token };
    },
  },
};

const resolveComposition = {
//  'Query.*': [middleware.Query.isAuthenticated()],
//  'Mutation.createUser': [middleware.Mutation.isAuthenticated()],
};
const composedResolvers = composeResolvers(user, resolveComposition);
module.exports = composedResolvers;
