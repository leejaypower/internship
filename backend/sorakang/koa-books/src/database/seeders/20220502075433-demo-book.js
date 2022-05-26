// eslint-disable-next-line import/no-extraneous-dependencies
const getBookDataApi = require('../../utils/getBookDataApi');
// promise로 return 되므로 후처리 필요하다

module.exports = {
  async up(queryInterface) {
    const bookList = await getBookDataApi('자바스크립트', 100);
    await queryInterface.bulkInsert('Books', bookList);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
