const Router = require('koa-router');

const controller = require('../../controller');

const reservationRouter = new Router();

const { reservation } = controller;

reservationRouter.post('/', reservation.createReservation);

module.exports = reservationRouter;
