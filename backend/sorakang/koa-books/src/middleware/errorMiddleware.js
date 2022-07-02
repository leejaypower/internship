const { customError } = require('../libs').errorHandler;

const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let errObj;
    ctx.status = err.statusCode || err.status || 500;

    if (ctx.status === 500) {
      errObj = new customError.InternalServerError(err.name, err.message, err.stack);
    } else {
      errObj = err;
    }
    ctx.body = errObj;

    // err를 내보낸다
    ctx.app.emit('error', err, ctx);
  }
};

module.exports = { errorMiddleware };
