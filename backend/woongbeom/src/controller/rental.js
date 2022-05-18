const service = require('../service');

const createRental = async (ctx) => {
  ctx.body = await service.rental.rentalService(ctx.request.body);
};

module.exports = { createRental };
