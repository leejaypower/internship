const { makeExecutableSchema } = require('@graphql-tools/schema');
const {
  typeDefs: scalarTypeDefs,
  resolvers: scalarResolvers,
} = require('graphql-scalars');
const { authUtils } = require('../../libs');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const context = require('./context');

let schema = makeExecutableSchema({
  typeDefs: [typeDefs, ...scalarTypeDefs],
  resolvers: [resolvers, scalarResolvers],
});
schema = authUtils.AuthorizationDirective(schema, 'auth');

module.exports = { schema, context };
