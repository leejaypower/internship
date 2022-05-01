exports.controllertest = (ctx) => {
  ctx.body = 'controller test';
};

exports.parsertest = (ctx) => {
  ctx.request.body = {
    test1: 'response1',
    test2: 'response2',
  };
  ctx.response.body = {
    request1: ctx.request.body.test1,
    request2: ctx.request.body.test2,
  };
};
