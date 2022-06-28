const service = require('../../service');
const { jwt } = require('../../../lib/auth');

const createReservation = async (ctx) => {
  try {
    const { bookId } = ctx.request.body;

    const token = ctx.request.header.authorization;
    const decodedToken = await jwt.verify(token);

    ctx.body = await service.reservation.createReservation(bookId, decodedToken);
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createReservation,
};
