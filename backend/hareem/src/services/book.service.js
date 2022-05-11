// Service 역할
// DB와 데이터 통신

const { Book } = require('../database/models');

const bookService = {
  async getBooks() {
    const books = await Book.findAll();
    return books;
  },
  async getBook(id) {
    const book = await Book.findByPk(id);
    if (!book) {
      // Not Found Error
    }
    return book;
  },
  async createBook(bookData) {
    const newBook = await Book.create(bookData);
    return newBook;
  },
  async updateBook(id, bookData) {
    const book = await Book.findByPk(id);
    if (!book) {
      // Not Found error
    }
    await book.set({
      ...bookData,
    });
    const updatedBook = await book.save();
    return updatedBook;
  },
  async deleteBook(id) {
    const book = await Book.findByPk(id);
    if (!book) {
      // Not Found error
    }
    await book.destroy();
    return book;
  },
};

module.exports = bookService;
