module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        bookType: 'PAPER_BOOK',
        bookInfoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bookType: 'AUDIO_BOOK',
        bookInfoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bookType: 'EBOOK',
        bookInfoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
