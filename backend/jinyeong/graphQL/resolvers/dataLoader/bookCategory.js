const DataLoader = require('dataloader');
const { bookCategoryService } = require('../../../services');
const { util, constants } = require('../../../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const batchGetBookCategory = async (bookCategoryIds) => {
  if (!Array.isArray(bookCategoryIds)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookCategoryList = await bookCategoryService.getAllByIds(bookCategoryIds);

  const mappedList = bookCategoryIds.map((bookCategoryId) => {
    const filtered = bookCategoryList.filter((bookCategory) => {
      return bookCategory.id === bookCategoryId;
    })[0] || null;

    return filtered;
  });

  return mappedList;
};

const batchGetByIds = new DataLoader(batchGetBookCategory);

module.exports = {
  batchGetByIds,
};
