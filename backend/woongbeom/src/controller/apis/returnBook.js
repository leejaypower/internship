const service = require('../../service');

const createReturn = async (ctx) => {
  try {
    const rentalId = ctx.request.body;
    ctx.body = await service.returnBook.createReturn(rentalId);
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createReturn,
};
