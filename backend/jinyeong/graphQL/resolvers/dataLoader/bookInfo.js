const DataLoader = require('dataloader');
const { bookInfoService } = require('../../services');

const batchGetBookInfo = async (bookInfoIds) => {
  const bookInfoList = await bookInfoService.getAllByIds(bookInfoIds);

  const mappedList = bookInfoIds.map((bookInfoId) => {
    const filtered = bookInfoList.filter((bookInfo) => {
      return bookInfo.id === bookInfoId;
    })[0] || null;

    return filtered;
  });

  return mappedList;
};

const batchGetByIds = new DataLoader(batchGetBookInfo);

module.exports = {
  batchGetByIds,
};
