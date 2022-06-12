const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { join } = require('path');

const resolvers = require('./resolver');

const mergeResolver = mergeResolvers(resolvers);
const mergedReSolvers = Object.values(mergeResolver);

const serviceTypeDefs = loadFilesSync(join(__dirname, './schema/*.graphql'));

const mergedServiceTypeDefs = mergeTypeDefs(serviceTypeDefs);

const middlewareTypeDefs = loadFilesSync(join(__dirname, '../middleware/graphql/*.graphql'));
const mergedMiddlewareTypeDefs = mergeTypeDefs(middlewareTypeDefs);

const schema = makeExecutableSchema({
  typeDefs: [mergedServiceTypeDefs, mergedMiddlewareTypeDefs],
  resolvers: mergedReSolvers,
});

module.exports = { schema };
