const Router = require('koa-router');

const reservationRouter = new Router();

const { reservationApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
reservationRouter.get('/', auth.userAuth, reservationApi.getAll);
reservationRouter.get('/:reservation_id', auth.userAuth, reservationApi.getById);
reservationRouter.get('/user/:user_id?', auth.userAuth, reservationApi.searchByUserId); // 유저별 예약이력 조회
reservationRouter.get('/book/:book_id?', auth.userAuth, reservationApi.searchByBookId); // 도서별 예약이력 조회

// POST 메소드
reservationRouter.post('/', auth.userAuth, reservationApi.createReservation); // 도서 예약등록

// PATCH 메소드
reservationRouter.patch('/:reservation_id/user/:user_id', auth.adminAuth, reservationApi.cancleReservation); // 도서 예약취소

module.exports = reservationRouter;
