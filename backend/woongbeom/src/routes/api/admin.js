const Router = require('koa-router');

const controller = require('../../controller');
const lib = require('../../lib');

const adminRouter = new Router();

const { admin } = controller;
const { logger } = lib.util;

adminRouter.get('/signin', logger.logRequest, admin.signIn);

module.exports = adminRouter;
