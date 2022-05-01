const Router = require('koa-router');
const controller = require('../controller/testapi.controller');

const testApi = new Router();

testApi.get('/', controller.controllertest);

testApi.get('/parsertest', controller.parsertest);

module.exports = testApi;
