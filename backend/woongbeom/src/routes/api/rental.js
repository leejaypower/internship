const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const rentalsRouter = new Router();

rentalsRouter.post('/', middleware.auth.authorization.authorizeUser, controller.rental.createRental);

module.exports = rentalsRouter;
