const service = require('../service');
const lib = require('../lib');

const { errorHandler } = lib.util.error;
const { jwt } = lib.auth;

const createRental = async (ctx) => {
  try {
    const rentalData = ctx.request.body;
    if (!rentalData) {
      errorHandler(1, 'Data does not exist.');
    }
    if (typeof (rentalData.bookId) !== 'number') {
      errorHandler(1, 'Book ID should be Number type.');
    }
    if (typeof (rentalData.userId) !== 'number') {
      errorHandler(1, 'User ID should be Number type.');
    }

    const token = ctx.request.header.authorization;
    const decodedToken = await jwt.verify(token);
    const userEmail = decodedToken.email;

    ctx.body = await service.rental.createRental(rentalData, userEmail);
  } catch (err) {
    ctx.throw(err);
  }
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
