const DataLoader = require('dataloader');
const { bookInfoService } = require('../../../services');
const { util, constants } = require('../../../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const batchGetBookInfo = async (bookInfoIds) => {
  if (!Array.isArray(bookInfoIds)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

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
