const service = require('../service');
const lib = require('../lib');

const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

const createReturn = async (ctx) => {
  const { rentalId } = ctx.request.body;
  if (typeof (rentalId) !== 'number') {
    throw new CustomError(errorCode.invalidInputType, '[src/controller/returnBook.js]');
  }

  ctx.body = await service.returnBook.createReturn(rentalId);
};

module.exports = {
  createReturn,
};
