const Router = require('koa-router');

const controller = require('../../controller');

const rentalsRouter = new Router();

rentalsRouter.post('/', controller.rental.createRental);

module.exports = rentalsRouter;
