const service = require('../../../service');

const getListAll = async () => {
  const booklist = await service.book.getListAll();
  return booklist;
};

module.exports = { getListAll };
