const { bookService } = require('../../../services');

const getBooksById = async (parent, args, context) => {
  if (!args.length) {
    //  message :  request empty
  }

  const { bookIds } = args;
  const bookList = await bookService.getBooksById(bookIds);

  context.body = { message: 'context test' };
  return bookList;
};

module.exports = { getBooksById };
