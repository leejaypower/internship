const Router = require('koa-router');

const controller = require('../../controller');
const lib = require('../../lib');

const reservationRouter = new Router();

const { reservation } = controller;
const { logger } = lib.util;

reservationRouter.post('/', logger.logRequest, reservation.createReservation);

module.exports = reservationRouter;
