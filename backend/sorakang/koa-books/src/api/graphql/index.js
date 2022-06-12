const { makeExecutableSchema } = require('@graphql-tools/schema');
const { AuthorizationDirective } = require('../../utils/auth');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const context = require('./context');

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
schema = AuthorizationDirective(schema, 'auth');

module.exports = { schema, context };
