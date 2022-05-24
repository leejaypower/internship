const Router = require('koa-router');

const controller = require('../../controller');
const auth = require('../../middleware/auth');

const rentalsRouter = new Router();

rentalsRouter.post('/', auth.auth.authorizeUser, controller.rental.createRental);

module.exports = rentalsRouter;
