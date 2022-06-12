const encodeCursor = (cursor) => Buffer.from(cursor).toString('base64');
const decodeCursor = (cursor) => Buffer.from(cursor, 'base64').toString('ascii');
const getBookDataApi = require('./getBookDataApi');

module.exports = { encodeCursor, decodeCursor, getBookDataApi };
