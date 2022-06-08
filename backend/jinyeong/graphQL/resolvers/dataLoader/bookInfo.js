const DataLoader = require('dataloader');
const { bookInfoService } = require('../../services');

const batchGetBookInfo = async (bookInfoIds) => {
  const bookInfoList = await bookInfoService.getAllByIds(bookInfoIds);

  const mapFunc = (bookInfoId) => {
    const filtered = bookInfoList.filter((bookInfo) => {
      return bookInfo.id === bookInfoId;
    })[0] || null;

    return filtered;
  };

  const mappedList = bookInfoIds.map(mapFunc);
  return mappedList;
};

const bookLoader = new DataLoader(batchGetBookInfo);

module.exports = bookLoader;
