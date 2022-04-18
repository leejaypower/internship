/**
 * simple CRUD test
 *  * 목표 : koa의 기본 동작 파악하기
 * 목표 : koa의 기본 동작 파악하기 흐름을 중점적으로
 * 각종 라이브러리 test 해보기
 * simple CRUD 구현 해보기
 * get userInfo post user patch userInfo delete user
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const router = require('./routes');
const app = new koa();
const port = 80;

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());
// routes : 요청과 부합하는 middleware를 return한다.
// allowedMethods() :

app.listen(port, () => {
  console.log(`Server listening on...${port} 🚀`);
});
