const Router = require('koa-router');

const controller = require('../../controller');

/**
 * ToDo
 * 코드 중복 피하고 가독성 올리기 위해 나머지 router도 적용
 */
const reservationController = controller.apis.reservation;

const reservationRouter = new Router();

reservationRouter.post('/', reservationController.createReservation);

module.exports = reservationRouter;
