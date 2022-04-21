const Router = require('koa-router');
const controller = require('../controllers/book');

const bookApi = new Router();

// GET /book API 연결
bookApi.get('/', controller.get);

module.exports = bookApi;
