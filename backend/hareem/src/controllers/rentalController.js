const { rentalService } = require('../services');

const createRentalStart = async (ctx) => {
  try {
    const { userId } = ctx.request.body; // 차후, ctx.user.id로 변경 필요
    const rental = await rentalService.createRentalStart(userId, ctx.request.body);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const createRentalExtend = async (ctx) => {
  try {
    const { userId } = ctx.request.body; // 차후, ctx.user.id로 변경 필요
    const rental = await rentalService.createRentalExtend(userId, ctx.request.body);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const createRentalEnd = async (ctx) => {
  try {
    const { userId } = ctx.request.body; // 차후, ctx.user.id로 변경 필요
    const rental = await rentalService.createRentalEnd(userId, ctx.request.body);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const getUsersRentals = async (ctx) => {
  try {
    const rentals = await rentalService.getUsersRentals(ctx.request.query);
    ctx.body = rentals;
  } catch (error) {
    ctx.throw(error);
  }
};

const getUserRentals = async (ctx) => {
  try {
    const { userId } = ctx.request.body; // 차후 ctx.user.id 로 수정 필요
    const rental = await rentalService.getUserRentals(userId, ctx.request.query);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const getRentalsByRentalId = async (ctx) => {
  try {
    const { rentalId } = ctx.params;
    const rentalHistory = await rentalService.getRentalHistory(rentalId);
    ctx.body = rentalHistory;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  createRentalStart,
  createRentalExtend,
  createRentalEnd,
  getUsersRentals,
  getUserRentals,
  getRentalsByRentalId,
};
