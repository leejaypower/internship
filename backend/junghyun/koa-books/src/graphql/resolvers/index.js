const { mergeResolvers } = require('@graphql-tools/merge');

const { bookResolver } = require('./book');
const { userResolver } = require('./user');

const resolvers = [userResolver, bookResolver];
const mergedResolvers = mergeResolvers(resolvers);

module.exports = mergedResolvers;
