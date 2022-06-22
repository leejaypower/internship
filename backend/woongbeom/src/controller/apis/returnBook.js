const service = require('../../service');
const { errorHandler } = require('../../../lib/util/error');

const createReturn = async (ctx) => {
  try {
    const rentalId = ctx.request.body;
    if (typeof (rentalId) !== 'number') {
      errorHandler(1, 'Rental Id should be type Number');
    }

    ctx.body = await service.returnBook.createReturn(rentalId);
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createReturn,
};
