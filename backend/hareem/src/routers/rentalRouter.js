const Router = require('@koa/router');
const authMiddleware = require('../middlewares/authMiddleware');
const { rentalController } = require('../controllers');
const { TABLE } = require('../utils/constants');

const rentalRouter = new Router();

rentalRouter.get('/users', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.getUsersRentals);
rentalRouter.get('/', authMiddleware([TABLE.USER_ROLE.USER]), rentalController.getUserRentals);
rentalRouter.get('/:rentalId', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.getRentalsByRentalId);
rentalRouter.post('/start', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.createRentalStart);
rentalRouter.post('/extension', authMiddleware([TABLE.USER_ROLE.USER]), rentalController.createRentalExtend);
rentalRouter.post('/end', authMiddleware([TABLE.USER_ROLE.ADMIN]), rentalController.createRentalEnd);

module.exports = rentalRouter;