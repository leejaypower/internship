const encodeCursor = (cursor) => Buffer.from(cursor).toString('base64');
const decodeCursor = (cursor) => Buffer.from(cursor, 'base64').toString('ascii');
const getBookDataApi = require('./getBookDataApi');
const retry = require('./retry'); // retry 방법은 다음 pr애서 수정하기

module.exports = {
  encodeCursor, decodeCursor, getBookDataApi, retry,
};
