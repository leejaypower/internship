const { mergeResolvers } = require('@graphql-tools/merge');

const bookResolver = require('./book');

const resolverList = [bookResolver];

const resolvers = mergeResolvers(resolverList);

module.exports = resolvers;
