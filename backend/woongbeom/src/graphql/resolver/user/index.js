const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const user = {
  Query: {
    users: async () => {
      const result = await controller.user.getListAll();
      return result;
    },
  },
  Mutation: {},
};

const resolveComposition = {
  'Query.*': [middleware.Query.isAuthenticated()],
};
const composedResolvers = composeResolvers(user, resolveComposition);
module.exports = composedResolvers;
