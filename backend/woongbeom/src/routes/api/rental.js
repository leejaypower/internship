const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');
const lib = require('../../lib');

const rentalsRouter = new Router();

const { authorizeUser } = middleware.auth.authorization;
const { rental } = controller;
const { logger } = lib.util;

rentalsRouter.post('/', logger.logRequest, authorizeUser, rental.createRental);
rentalsRouter.get('/', logger.logRequest, rental.getRentals);

module.exports = rentalsRouter;
