const Router = require('@koa/router');
const { authMiddleware } = require('../../../middleware');

const reserveRouter = new Router();
const { reserveController } = require('../controller');

const { constant } = require('../../../libs');

const { ROLES } = constant;

reserveRouter.get('/', authMiddleware.verifyToken(ROLES.COMMON), reserveController.getAllReservation);
reserveRouter.post('/', authMiddleware.verifyToken(ROLES.COMMON), reserveController.createReservation);
reserveRouter.patch('/', authMiddleware.verifyToken(ROLES.COMMON), reserveController.updateReservation);
reserveRouter.delete('/:reservationId', authMiddleware.verifyToken(ROLES.COMMON), reserveController.deleteReservation);

module.exports = reserveRouter;
