const Router = require('@koa/router');
const { authMiddleware } = require('../../../middleware');

const rentalRouter = new Router();
const { rentalController } = require('../controller');

const { constant } = require('../../../libs');

const { ROLES } = constant;

rentalRouter.get('/', authMiddleware.verifyToken(ROLES.ADMIN), rentalController.getAllRental);
rentalRouter.get('/info', authMiddleware.verifyToken(ROLES.COMMON), rentalController.getRentalInfo);
rentalRouter.post('/', authMiddleware.verifyToken(ROLES.COMMON), rentalController.createRental);
rentalRouter.patch('/:rentalId', authMiddleware.verifyToken(ROLES.COMMON), rentalController.extendRentDate);
rentalRouter.delete('/:rentalId', authMiddleware.verifyToken(ROLES.COMMON), rentalController.returnRental);

module.exports = rentalRouter;
