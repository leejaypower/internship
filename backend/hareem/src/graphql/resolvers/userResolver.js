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

const users = [
  {
    name: 'tester',
    age: 10,
    books,
  },
  {
    name: 'tester2',
    age: 20,
    books: [books[0]],
  },
];

module.exports = {
  Query: {
    users: () => users,
  },
};
