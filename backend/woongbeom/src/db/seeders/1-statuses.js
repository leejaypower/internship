module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Statuses', [
      {
        id: 0,
        description: '대출 가능',
      },
      {
        id: 1,
        description: '대출 불가',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};
