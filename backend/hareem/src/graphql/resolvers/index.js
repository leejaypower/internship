// 차후 자동 으로 파일 가져오는 것으로 변경 고려
// (https://www.graphql-tools.com/docs/schema-merging)
const { mergeResolvers } = require('@graphql-tools/merge');
const bookResolver = require('./bookResolver');
const userResolver = require('./userResolver');
const rentalResolver = require('./rentalResolver');
const reservationResolver = require('./reservationResolver');

const resolvers = [
  bookResolver,
  userResolver,
  rentalResolver,
  reservationResolver,
];

module.exports = mergeResolvers(resolvers);
