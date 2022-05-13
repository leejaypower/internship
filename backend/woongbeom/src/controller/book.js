const service = require('../service/index');

const createBook = async (ctx) => {
  ctx.body = await service.book.createBook(ctx.request.body);
};

const getListAll = async (ctx) => {
  ctx.body = await service.book.getListAll();
};

module.exports = { createBook, getListAll };
