const getBookDataApi = require('../../utils/getBookDataApi');

module.exports = {
  async up(queryInterface) {
    const bookList = await getBookDataApi('자바스크립트', 30);
    const bookSerial = await bookList.map((book, idx) => ({
      bookId: idx + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Books', bookList);
    await queryInterface.bulkInsert('BookSerials', bookSerial);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('BookSerials', null, {});
  },
};

// npx sequelize-cli db:seed --seed 20220520061409-book.js
