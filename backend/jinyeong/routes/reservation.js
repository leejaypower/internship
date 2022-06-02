const Router = require('koa-router');

const reservationRouter = new Router();
const { reservationApi } = require('../apis');

// GET 메소드
reservationRouter.get('/', reservationApi.getAll); // 전체 예약이력 조회 요청
reservationRouter.get('/user/:user_id?', reservationApi.searchByUserId); // 유저별 예약이력 조회
reservationRouter.get('/book/:book_id?', reservationApi.searchByBookId); // 도서별 예약이력 조회
reservationRouter.get('/:reservation_id', reservationApi.getOneById); // 예약이력 조회 By id

// POST 메소드
reservationRouter.post('/', reservationApi.post); // 도서 예약등록

// PATCH 메소드
reservationRouter.patch('/:reservation_id/users/:user_id', reservationApi.patchByUserId); // 도서 예약취소

module.exports = reservationRouter;
