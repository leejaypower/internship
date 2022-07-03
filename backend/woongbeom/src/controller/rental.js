const service = require('../service');
const lib = require('../lib');

const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

const createRental = async (ctx) => {
  const { bookId } = ctx.request.body;
  if (!bookId) {
    throw new CustomError(errorCode.requiredInputNotNull, '[src/controller/rental.js]');
  }
  if (typeof (bookId) !== 'number') {
    throw new CustomError(errorCode.invalidInputType, '[src/controller/rental.js]');
  }

  const userEmail = ctx.decodedToken.email;

  const rentalData = { bookId, userEmail };

  ctx.body = await service.rental.createRental(rentalData);
};

const getRentals = async (ctx) => {
  try {
    ctx.body = await service.rental.getRentals(ctx.request.query);
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createRental,
  getRentals,
};
