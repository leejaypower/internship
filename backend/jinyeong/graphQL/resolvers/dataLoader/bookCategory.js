const DataLoader = require('dataloader');
const { bookCategoryService } = require('../../services');

const batchGetBookCategory = async (bookCategoryIds) => {
  const bookCategoryList = await bookCategoryService.getAllByIds(bookCategoryIds);

  const mapFunc = (bookCategoryId) => {
    const filtered = bookCategoryList.filter((bookCategory) => {
      return bookCategory.id === bookCategoryId;
    })[0] || null;

    return filtered;
  };

  const mappedList = bookCategoryIds.map(mapFunc);
  return mappedList;
};

const bookCategoryLoader = new DataLoader(batchGetBookCategory);

module.exports = bookCategoryLoader;
