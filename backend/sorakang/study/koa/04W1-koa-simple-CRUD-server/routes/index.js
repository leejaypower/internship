const Router = require('@koa/router');
const router = new Router();

const users = require('./users');
const main = require('../controller/main');

router.get('/', main);
router.use('/users', users.routes()); // 요청에 맞는 router를 반환

module.exports = router;

/**
 * 사용법1
 * Router 객체를 new 키워로 생성한다
 * 생성된 Router 객체의 메소드를 사용하여 path에 맞는 middleware를 호춣한다.
 */

/**
 * 사용법2 : router가 많아서 모듈화를 헤야하는 경우
 * 모둘화한  router를 import하고
 * routes() method를 통해 요청에 맞는 router를 반환한다.
 */
