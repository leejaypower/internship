const { rentalService } = require('../services');

const createRentalStart = async (ctx) => {
  try {
    // 어드민 관리자가 대출 시작을 담당해주므로,
    // target userId를 받아와야 함
    const { userId } = ctx.request.body;
    const rental = await rentalService.createRentalStart(userId, ctx.request.body);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const createRentalExtend = async (ctx) => {
  try {
    const { id: userId } = ctx.user;
    const rental = await rentalService.createRentalExtend(userId, ctx.request.body);
    ctx.body = rental;
  } catch (error) {
    ctx.throw(error);
  }
};

const createRentalEnd = async (ctx) => {
  try {
    // 어드민 관리자가 대출 반납을 담당해주므로,
    // target userId를 받아와야 함
    const { userId } = ctx.request.body;
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
    const { id: userId } = ctx.user;
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
