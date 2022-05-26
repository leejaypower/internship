const Router = require('@koa/router');
const { rentalController } = require('../controllers');

const rentalRouter = new Router();

rentalRouter.get('/users', rentalController.getUsersRentals);
rentalRouter.get('/', rentalController.getUserRentals);
rentalRouter.get('/:rentalId', rentalController.getRentalsByRentalId);
rentalRouter.post('/start', rentalController.createRentalStart);
rentalRouter.post('/extension', rentalController.createRentalExtend);
rentalRouter.post('/end', rentalController.createRentalEnd);

module.exports = rentalRouter;
