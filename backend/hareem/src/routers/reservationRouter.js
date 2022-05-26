const Router = require('@koa/router');
const { reservationController } = require('../controllers');

const reservationRouter = new Router();

reservationRouter.get('/users', reservationController.getUsersReservations);
reservationRouter.get('/', reservationController.getUserReservations);
reservationRouter.post('/:bookInfoId', reservationController.createReservation);
reservationRouter.delete('/:id', reservationController.deleteReservation);

module.exports = reservationRouter;
