const { mergeTypeDefs } = require('@graphql-tools/merge');

const commmonTypeDefs = require('./common');
const bookTypeDefs = require('./book');

const typeDefsList = [...commmonTypeDefs, bookTypeDefs];

const typeDefs = mergeTypeDefs(typeDefsList);

module.exports = typeDefs;
