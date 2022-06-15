const { mergeTypeDefs } = require('@graphql-tools/merge');

const bookType = require('./book');
const userType = require('./user');

const types = [bookType, userType];
const typeDefs = mergeTypeDefs(types);

module.exports = typeDefs;
