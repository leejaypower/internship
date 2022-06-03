const Router = require('@koa/router');
const { authMiddleware } = require('../middleware');

const reserveRouter = new Router();
const { reserveController } = require('../controller');

reserveRouter.get('/', reserveController.getAllReservation);
reserveRouter.post('/', reserveController.createReservation);
reserveRouter.patch('/', reserveController.updateReservation);
reserveRouter.delete('/:reservationId', reserveController.deleteReservation);

module.exports = reserveRouter;
