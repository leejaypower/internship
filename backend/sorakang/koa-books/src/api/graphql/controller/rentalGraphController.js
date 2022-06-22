const { rentalGraphService } = require('../service');
const { rentalService } = require('../../../services');

const getAllRental = async (parent, { limit, afterCursor }, context) => {
  const rentalList = await rentalGraphService.getAllRental({ limit, afterCursor });
  return rentalList;
};

const getRentalByUserId = async (parent, { input }, context) => {
  // 만약 uer의 role이 admin이라면 body의 id사용 아니라면 context user id 사용
  const userId = context.code === 'ADMIN' ? input.userId : context.user.id;

  const { rentalList } = await rentalService.getRentalInfo({ userId });
  return { rentalList };
};

const getRentalByBookId = async (parent, { input }, context) => {
  const { bookId } = input;
  const rentals = await rentalGraphService.getRentalByBookId({ bookId });
  return rentals;
};

const createRental = async (parent, { rentalInfo }, context) => {
  try {
    const { bookSerialId } = rentalInfo;
    const userId = context.code === 'ADMIN' ? rentalInfo.userId : context.user.id;

    const { rentInfo, isCreated } = await rentalGraphService.createRental({ userId, bookSerialId });

    if (isCreated) {
      return { message: 'Successfully created', data: rentInfo };
    }

    return { message: 'Already reserved', data: rentInfo };
  } catch (error) {
    throw Error(error);
  }
};

const extendRentDate = async (parent, { rentalInfo }, context) => {
  try {
    const { rentalId, bookSerialId } = rentalInfo;
    const { updatedCount } = await rentalService.extendRentDate(bookSerialId, rentalId);
    if (!updatedCount) {
      return { message: 'Extend failed' };
    }

    return { message: 'Successfully Extended' };
  } catch (error) {
    throw Error(error);
  }
};

const returnRentalBook = async (parent, { input }, context) => {
  const { rentalId, bookSerialId } = input;
  const { rentalUpdatedCount, rentHistory } = await rentalGraphService.returnRentalBook({ rentalId, bookSerialId });
  return { data: rentHistory.dataValues, message: { message: 'Successfully returned' } };
};

module.exports = {
  createRental,
  extendRentDate,
  getAllRental,
  getRentalByUserId,
  getRentalByBookId,
  returnRentalBook,
};
