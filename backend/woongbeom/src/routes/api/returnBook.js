const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');
const lib = require('../../lib');

const returnRouter = new Router();

const { authorizeUser } = middleware.auth.authorization;
const { returnBook } = controller;
const { logger } = lib.util;

returnRouter.post('/', logger.logRequest, authorizeUser, returnBook.createReturn);

module.exports = returnRouter;
