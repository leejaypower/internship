// 차후 자동 으로 파일 가져오는 것으로 변경 고려
// (https://www.graphql-tools.com/docs/schema-merging)
const { mergeResolvers } = require('@graphql-tools/merge');
const bookResolver = require('./bookResolver');
const userResolver = require('./userResolver');

const resolvers = [
  bookResolver,
  userResolver,
];

module.exports = mergeResolvers(resolvers);
