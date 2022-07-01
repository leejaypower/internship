const DataLoader = require('dataloader');
const { bookCategoryService } = require('../../../services');

const batchGetBookCategory = async (bookCategoryIds) => {
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
