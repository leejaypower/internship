const DataLoader = require('dataloader');
const { rentalService } = require('../../services');

// 유저별 도서대출이력 조회에 필요한 Batch Function
const batchGetRentalsByUserIds = async (userIds) => {
  const rentalList = await rentalService.getListByUserIds(userIds);

  const mappedList = userIds.map((userId) => {
    const filterd = rentalList.filter((rental) => {
      return rental.userId === userId;
    });

    return filterd;
  });

  return mappedList;
};

// 도서별 도서대출이력 조회에 필요한 Batch Function
const batchGetRentalsByBookIds = async (bookIds) => {
  const rentalList = await rentalService.getListByBookIds(bookIds);

  const mappedList = bookIds.map((bookId) => {
    const filterd = rentalList.filter((rental) => {
      return rental.bookId === bookId;
    });

    return filterd;
  });

  return mappedList;
};

const batchGetListByUserIds = new DataLoader(batchGetRentalsByUserIds);
const batchGetListByBookIds = new DataLoader(batchGetRentalsByBookIds);

module.exports = {
  batchGetListByUserIds,
  batchGetListByBookIds,
};
