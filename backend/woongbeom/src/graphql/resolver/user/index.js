const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const service = require('../../../service');
const auth = require('../auth');

const user = {
  Query: {
    getUsers: async (parent, args) => {
      const userQuery = args;
      const result = await service.user.getUsers(userQuery);
      return result;
    },
    getUserById: async (parent, args) => {
      const userId = args.id;
      const result = await service.user.getUserById(userId);
      return [result];
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const userData = args;
      const result = await service.user.createUser(userData);
      return [result];
    },
    updateUserName: async (parent, args) => {
      const userId = args.id;
      const newUserName = args.name;

      const result = await service.user.updateUserName(userId, newUserName);
      return result;
    },
    signIn: async (parent, args) => {
      const { email, password } = args;
      const token = await service.user.signIn(email, password);
      return { token };
    },
  },
};

const resolveComposition = {
  'Query.*': [auth.admin()],
  'Mutation.updateUserName': [auth.user()],
};

const composedResolvers = composeResolvers(user, resolveComposition);
module.exports = composedResolvers;
