const service = require('../../service');
const { jwt } = require('../../../lib/auth');

const createRental = async (ctx) => {
  try { 
    const rentalData = ctx.request.body;
    const token = ctx.request.header.authorization;
    const decodedToken = await jwt.verify(token);
    const userEmail = decodedToken.email;

    ctx.body = await service.rental.createRental(rentalData, userEmail);
  } catch (err) {
    ctx.throw(err.message);
  }
};

module.exports = { createRental };
