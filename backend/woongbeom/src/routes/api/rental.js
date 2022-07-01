const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const rentalsRouter = new Router();

const { authorizeUser } = middleware.auth.authorization;
const { rental } = controller;

rentalsRouter.post('/', authorizeUser, rental.createRental);
rentalsRouter.get('/', rental.getRentals);

module.exports = rentalsRouter;
