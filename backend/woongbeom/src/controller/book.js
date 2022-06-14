const service = require('../service');
const { errorHandler } = require('../../lib/util/error');

const createBook = async (ctx) => {
  try {
    if (!ctx.request.body.title
      || !ctx.request.body.author
      || !ctx.request.body.publisher
      || !ctx.request.body.page) {
      errorHandler(1, 'Book instance\'s element does not exist.');
    }
    if (typeof (ctx.request.body.title) !== 'string'
    || typeof (ctx.request.body.author) !== 'string'
    || typeof (ctx.request.body.publisher) !== 'string'
    || typeof (ctx.request.body.page) !== 'number') {
      errorHandler(1, 'Invalid type of book instance');
    }
    ctx.body = await service.book.createBook(ctx.request.body);
  } catch (err) {
    ctx.throw(err);
  }
};

const getListAll = async (ctx) => {
  try {
    ctx.body = await service.book.getListAll();
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = { createBook, getListAll };
