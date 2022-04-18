/**
 * 목표 : koa의 기본 동작 파악하기 흐름을 중점적으로
 * 각종 라이브러리 test 해보기
 * simple CRUD 구현 해보기
 * get userInfo post user patch userInfo delete user
 */
const koa = require('koa');

const app = new koa();

// logger middleware
app.use(async (ctx, next) => {
  // ctx === context res,req를 encapsulation obj 이다.
  // express의 res = ctx.Response , express의 req = ctx.Request
  console.log('start');
  await next(); // await 키워드로 인해 next() miidleware를 실행한다.
  const rt = ctx.response.get('X-Response-Time'); // 마지막으로 실행 된다.
  console.log(`logger ${ctx.method} ${ctx.url} - ${rt}`); // request method와 request url
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('2');
  const start = Date.now();
  await next(); // next middleware를 실행한다.
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
  console.log('3');
  ctx.body = 'Hello World';
});

app.listen(3000);
