const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

module.exports = {
  Query: {
    books: (parent, args, context) => books,
  },

  Mutation: {
    addBook: (_, args) => {
      const {
        title, author,
      } = args;
      books.push({ title, author });
      return books[books.length - 1];
    },
  },
};
