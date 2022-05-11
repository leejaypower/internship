const getBookDto = (id) => ({
  id,
});

const createBookDto = ({ name, author, detail }) => ({
  name,
  author,
  detail,
});

const updateBookDto = ({ name, author, detail }) => {
  const result = {};
  if (name) {
    result.name = name;
  }
  if (author) {
    result.author = author;
  }
  if (detail) {
    result.detail = detail;
  }
  return result;
};

const deleteBookDto = (id) => ({
  id,
});

module.exports = {
  getBookDto,
  createBookDto,
  updateBookDto,
  deleteBookDto,
};
