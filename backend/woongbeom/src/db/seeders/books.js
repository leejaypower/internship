module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'book 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'book 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'book 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
