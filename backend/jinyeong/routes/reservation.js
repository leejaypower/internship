const Router = require('koa-router');

const reservationRouter = new Router();
const { reservationApi } = require('../controller');

// GET 메소드
reservationRouter.get('/', reservationApi.getAll);
reservationRouter.get('/user/:user_id?', reservationApi.searchByUserId); // 유저별 예약이력 조회
reservationRouter.get('/book/:book_id?', reservationApi.searchByBookId); // 도서별 예약이력 조회
reservationRouter.get('/:reservation_id', reservationApi.getById);

// POST 메소드
reservationRouter.post('/', reservationApi.createReservation); // 도서 예약등록

// PATCH 메소드
reservationRouter.patch('/:reservation_id/user/:user_id', reservationApi.cancleReservation); // 도서 예약취소

module.exports = reservationRouter;
