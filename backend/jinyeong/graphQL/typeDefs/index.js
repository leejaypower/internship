const { mergeTypeDefs } = require('@graphql-tools/merge');

const commmonTypeDefs = require('./common');
const bookTypeDefs = require('./book');
const userTypeDefs = require('./user');

const typeDefsList = [
  ...commmonTypeDefs,
  bookTypeDefs,
  userTypeDefs,
];

const typeDefs = mergeTypeDefs(typeDefsList);

module.exports = typeDefs;
