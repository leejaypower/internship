const { ApolloServer } = require('apollo-server-koa');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core'); // gracful shutdown
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { errorResponse } = require('../middleware');

let schema = makeExecutableSchema({
  typeDefs: [typeDefs, constraintDirectiveTypeDefs],
  resolvers,
});
schema = constraintDirective()(schema);

const loaders = require('./resolvers/dataLoader');

const createApolloServer = (httpServer) => {
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    formatError: (err) => {
      console.log(err);
      return errorResponse.graphqlApiErrorResponse(err);
    },
    context: async ({ ctx }) => {
      const token = {};
      if (ctx.headers.authorization) {
        const accessToken = ctx.headers.authorization.split(' ')[1];
        token.accessToken = accessToken;
      }

      return {
        token,
        loaders,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  return apolloServer;
};

module.exports = {
  createApolloServer,
};
