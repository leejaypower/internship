const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const returnRouter = new Router();

const { authorizeUser } = middleware.auth.authorization;
const { returnBook } = controller;

returnRouter.post('/', authorizeUser, returnBook.createReturn);

module.exports = returnRouter;
