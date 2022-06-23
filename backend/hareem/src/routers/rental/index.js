const Router = require('@koa/router');
const { TABLE } = require('../../constants');
const { rentalController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const rentalRouter = new Router();

rentalRouter.get('/users', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.getUsersRentals);
rentalRouter.get('/', authMiddleware([TABLE.USER_ROLE.USER]), rentalController.getUserRentals);
rentalRouter.get('/:rentalId', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.getRentalsByRentalId);
rentalRouter.post('/start', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.createRentalStart);
rentalRouter.post('/extension', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), rentalController.createRentalExtend);
rentalRouter.post('/end', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.createRentalEnd);

module.exports = rentalRouter;
