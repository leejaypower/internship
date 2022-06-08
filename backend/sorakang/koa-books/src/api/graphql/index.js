const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
