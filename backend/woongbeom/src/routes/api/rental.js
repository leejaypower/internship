const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const rentalsRouter = new Router();

rentalsRouter.post('/', middleware.auth.authorization.authorizeUser, controller.apis.rental.createRental);
rentalsRouter.get('/', controller.apis.rental.getRentals);

module.exports = rentalsRouter;
