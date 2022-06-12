const { ApolloServer } = require('apollo-server-koa');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers: scalarResolvers, typeDefs: scalarTypeDefs } = require('graphql-scalars');
const { typeDefs, resolvers } = require('./graphql');
const { loaders } = require('./graphql');

const apollo = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      ...scalarTypeDefs,
      typeDefs,
    ],
    resolvers: [
      scalarResolvers,
      resolvers,
    ],
  }),
  csrfPrevention: true,
  context: ({ ctx }) => ({ loaders }),
});

module.exports = {
  apollo,
};
