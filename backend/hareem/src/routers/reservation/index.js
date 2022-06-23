const Router = require('@koa/router');
const { TABLE } = require('../../constants');
const { reservationController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const reservationRouter = new Router();

reservationRouter.get('/users', authMiddleware([TABLE.USER_ROLE.ADMIN]), reservationController.getUsersReservations);
reservationRouter.get('/', authMiddleware([TABLE.USER_ROLE.USER]), reservationController.getUserReservations);
reservationRouter.post('/:bookInfoId', authMiddleware([TABLE.USER_ROLE.USER]), reservationController.createReservation);
reservationRouter.delete('/:id', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), reservationController.deleteReservation);

module.exports = reservationRouter;
